import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const scriptPath = fileURLToPath(import.meta.url);
const webRoot = path.resolve(path.dirname(scriptPath), "..");
const nextCliPath = require.resolve("next/dist/bin/next");
const defaultPort = Number.parseInt(process.env.PORT ?? "5000", 10) || 5000;
const host = process.env.HOST || "0.0.0.0";

await main();

async function main() {
  if (!process.env.AGENCY_SKIP_NODE20_ENFORCEMENT) {
    const enforced = await enforceNode20();
    if (enforced) {
      return;
    }
  }

  let port = defaultPort;
  const occupant = await getPortOccupant(port);

  if (occupant) {
    if (isWorkspaceNextProcess(occupant)) {
      console.log(`Port ${port} is already used by an existing Agency Next.js server (PID ${occupant.pid}). Restarting it cleanly...`);
      await stopProcess(occupant.pid);
      await waitForPortToBeFree(port);
    } else {
      const fallbackPort = await findAvailablePort(port + 1);
      console.log(
        `Port ${port} is already in use${occupant.name ? ` by ${occupant.name} (PID ${occupant.pid})` : ""}. Starting on port ${fallbackPort} instead.`
      );
      port = fallbackPort;
    }
  }

  startNextDevServer(port);
}

async function enforceNode20() {
  const currentMajor = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
  if (currentMajor === 20) {
    return false;
  }

  const fnmPath = await findFnm();
  if (!fnmPath) {
    console.error(`This workspace expects Node 20.x, but the current runtime is ${process.version}. Install fnm or switch to Node 20 before running the dev server.`);
    process.exit(1);
  }

  const child = spawn(fnmPath, ["exec", "--using=20", "node", scriptPath], {
    cwd: webRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      AGENCY_SKIP_NODE20_ENFORCEMENT: "1",
    },
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });

  ["SIGINT", "SIGTERM", "SIGBREAK"].forEach((signal) => {
    process.on(signal, () => {
      if (!child.killed) {
        child.kill(signal);
      }
    });
  });

  return true;
}

async function findFnm() {
  const fromPath = await runCommand("where.exe", ["fnm"]);
  if (fromPath.exitCode === 0) {
    const resolved = fromPath.stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean);

    if (resolved) {
      return resolved;
    }
  }

  const packagesRoot = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Packages");
  try {
    const entries = await readdir(packagesRoot, { withFileTypes: true });
    const match = entries.find((entry) => entry.isDirectory() && entry.name.startsWith("Schniz.fnm_"));
    if (!match) {
      return null;
    }

    return path.join(packagesRoot, match.name, "fnm.exe");
  } catch {
    return null;
  }
}

async function getPortOccupant(port) {
  if (!(await isPortInUse(port))) {
    return null;
  }

  if (process.platform === "win32") {
    return getWindowsPortOccupant(port);
  }

  return { pid: null, name: null, commandLine: null };
}

async function getWindowsPortOccupant(port) {
  const script = [
    `$connection = Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1`,
    `if (-not $connection) { exit 0 }`,
    `$process = Get-CimInstance Win32_Process -Filter \"ProcessId = $($connection.OwningProcess)\" | Select-Object @{Name='pid';Expression={$_.ProcessId}}, @{Name='name';Expression={$_.Name}}, @{Name='commandLine';Expression={$_.CommandLine}}`,
    `$process | ConvertTo-Json -Compress`,
  ].join("; ");

  const result = await runCommand("powershell.exe", ["-NoProfile", "-Command", script]);
  if (result.exitCode !== 0 || !result.stdout.trim()) {
    return { pid: null, name: null, commandLine: null };
  }

  try {
    return JSON.parse(result.stdout.trim());
  } catch {
    return { pid: null, name: null, commandLine: null };
  }
}

function isWorkspaceNextProcess(occupant) {
  if (!occupant?.pid || !occupant.commandLine) {
    return false;
  }

  const commandLine = occupant.commandLine.toLowerCase();
  const normalizedRoot = webRoot.toLowerCase();

  return occupant.name?.toLowerCase() === "node.exe" && commandLine.includes(normalizedRoot) && commandLine.includes("next");
}

async function stopProcess(pid) {
  if (process.platform === "win32") {
    const result = await runCommand("taskkill", ["/PID", String(pid), "/T", "/F"]);
    if (result.exitCode !== 0) {
      throw new Error(`Unable to stop process ${pid}: ${result.stderr || result.stdout}`);
    }
    return;
  }

  process.kill(pid, "SIGTERM");
}

async function waitForPortToBeFree(port) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (!(await isPortInUse(port))) {
      return;
    }

    await delay(250);
  }

  throw new Error(`Port ${port} did not become available in time.`);
}

async function findAvailablePort(startingPort) {
  let candidate = startingPort;
  while (await isPortInUse(candidate)) {
    candidate += 1;
  }
  return candidate;
}

async function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.unref();
    server.once("error", (error) => {
      if (error && error.code === "EADDRINUSE") {
        resolve(true);
        return;
      }

      resolve(false);
    });
    server.once("listening", () => {
      server.close(() => resolve(false));
    });
    server.listen(port, host);
  });
}

function startNextDevServer(port) {
  const child = spawn(process.execPath, [nextCliPath, "dev", "--webpack", "-p", String(port), "-H", host], {
    cwd: webRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: String(port),
    },
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });

  ["SIGINT", "SIGTERM", "SIGBREAK"].forEach((signal) => {
    process.on(signal, () => {
      if (!child.killed) {
        child.kill(signal);
      }
    });
  });
}

async function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: webRoot,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      resolve({ exitCode: 1, stdout, stderr: stderr || String(error) });
    });

    child.on("close", (exitCode) => {
      resolve({ exitCode: exitCode ?? 0, stdout, stderr });
    });
  });
}