import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const localBaseUrl = (process.env.LOCAL_BASE_URL ?? "http://localhost:3100").replace(/\/$/, "");
const routeMapPath = path.join(projectRoot, "DOC", "migration", "phase1.4", "route-map.json");
const outputDir = path.join(projectRoot, "DOC", "migration", "phase1.4", "artifacts", "runtime-matrix");

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function composeUrl(routePath) {
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${localBaseUrl}${normalized}`;
}

function expectedStatusForRoute(routePath) {
  return routePath === "/404" ? 404 : 200;
}

function loadRoutes() {
  const raw = fs.readFileSync(routeMapPath, "utf8");
  const parsed = JSON.parse(raw);
  return (parsed.routes ?? []).map((entry) => entry.path);
}

function summarizeAxeViolations(violations) {
  const severe = violations.filter((violation) =>
    violation.impact === "critical" || violation.impact === "serious",
  );

  const severeDetails = severe.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    nodes: violation.nodes.slice(0, 8).map((node) => ({
      html: node.html,
      target: node.target,
      failureSummary: node.failureSummary,
    })),
  }));

  return {
    total: violations.length,
    seriousOrCritical: severe.length,
    ids: violations.map((violation) => violation.id),
    severeIds: severe.map((violation) => violation.id),
    severeDetails,
  };
}

function markdownEscape(text) {
  return text.replace(/\|/g, " ").replace(/\n/g, " ").trim();
}

function writeMarkdown(report, filePath) {
  const lines = [];
  lines.push("# Phase 1.4 Runtime Matrix");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`LOCAL_BASE_URL: ${report.localBaseUrl}`);
  lines.push("");
  lines.push(`Overall pass: ${report.overallPass ? "yes" : "no"}`);
  lines.push("");
  lines.push("| Route | Status | Expected | Console Errors | Page Errors | Axe Severe | Pass | Notes |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|---|");

  for (const row of report.results) {
    const notes = [];

    if (row.axe.severeIds.length) {
      notes.push(`axe:${row.axe.severeIds.join(",")}`);
    }
    if (row.consoleErrors.length) {
      notes.push(`console:${row.consoleErrors[0]}`);
    }
    if (row.pageErrors.length) {
      notes.push(`page:${row.pageErrors[0]}`);
    }

    lines.push(
      `| ${row.route} | ${row.statusCode ?? "n/a"} | ${row.expectedStatus} | ${row.consoleErrors.length} | ${row.pageErrors.length} | ${row.axe.seriousOrCritical} | ${row.pass ? "yes" : "no"} | ${markdownEscape(notes.join("; "))} |`,
    );
  }

  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

async function run() {
  ensureDirectory(outputDir);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1512, height: 982 } });

  const routes = loadRoutes();
  const results = [];

  try {
    for (const route of routes) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });

      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      let statusCode = null;
      let axe = { total: 0, seriousOrCritical: 0, ids: [], severeIds: [], severeDetails: [] };
      let routeError = null;

      try {
        const response = await page.goto(composeUrl(route), {
          waitUntil: "networkidle",
          timeout: 120000,
        });

        statusCode = response ? response.status() : null;

        const axeResult = await new AxeBuilder({ page }).analyze();
        axe = summarizeAxeViolations(axeResult.violations);
      } catch (error) {
        routeError = error instanceof Error ? error.message : String(error);
      }

      const expectedStatus = expectedStatusForRoute(route);
      const filteredConsoleErrors =
        route === "/404"
          ? consoleErrors.filter(
              (message) => !message.includes("Failed to load resource") && !message.includes("404"),
            )
          : consoleErrors;

      const pass =
        routeError === null &&
        statusCode === expectedStatus &&
        filteredConsoleErrors.length === 0 &&
        pageErrors.length === 0 &&
        axe.seriousOrCritical === 0;

      results.push({
        route,
        statusCode,
        expectedStatus,
        consoleErrors: filteredConsoleErrors,
        rawConsoleErrors: consoleErrors,
        pageErrors,
        axe,
        error: routeError,
        pass,
      });

      console.log(
        `[runtime] ${route} status=${statusCode} expected=${expectedStatus} consoleErrors=${filteredConsoleErrors.length} pageErrors=${pageErrors.length} axeSevere=${axe.seriousOrCritical} pass=${pass}`,
      );

      if (routeError) {
        console.log(`[runtime] ${route} error=${routeError}`);
      }

      await page.close();
    }
  } finally {
    await context.close();
    await browser.close();
  }

  const overallPass = results.every((row) => row.pass);
  const report = {
    generatedAt: new Date().toISOString(),
    localBaseUrl,
    overallPass,
    results,
  };

  const jsonPath = path.join(outputDir, "runtime-summary.json");
  const markdownPath = path.join(outputDir, "runtime-summary.md");

  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  writeMarkdown(report, markdownPath);

  console.log(`[runtime] wrote ${path.relative(projectRoot, jsonPath)}`);
  console.log(`[runtime] wrote ${path.relative(projectRoot, markdownPath)}`);
  console.log(`[runtime] overallPass=${overallPass}`);

  if (!overallPass) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
