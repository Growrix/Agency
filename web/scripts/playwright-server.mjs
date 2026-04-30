import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const dataDirectory = process.env.AGENCY_DATA_DIRECTORY?.trim() || path.join(process.cwd(), ".data", "playwright");
const databasePath = path.join(dataDirectory, "agency-db.json");

const seedDatabase = {
  products: [
    {
      slug: "three-circles-template",
      name: "Three Circles Template",
      price: "$999",
      livePreviewUrl: "https://three-circles-demo.vercel.app",
      embeddedPreviewUrl: "https://three-circles-demo.vercel.app",
      category: "Interior Designer Company",
      categorySlug: "interior-designer-company",
      type: "SaaS",
      typeSlug: "saas",
      industry: "Service",
      industrySlug: "service",
      published: true,
      teaser: "Premium website template for interior design brands.",
      summary: "A polished website template built for premium service businesses.",
      audience: "Interior design studios",
      previewVariant: "marketing",
      includes: ["Homepage", "Services page"],
      stack: ["Next.js", "Sanity"],
      highlights: [{ label: "Pages", value: "12" }],
      image: null,
    },
  ],
  portfolio_projects: [
    {
      slug: "three-circles",
      name: "Three Circles",
      livePreviewUrl: "https://threecircles.com",
      embeddedPreviewUrl: "https://demo.threecircles.com",
      industry: "Interior Design",
      service: "websites",
      summary: "A premium company website for an interior design brand.",
      metric: "+37% qualified inquiries",
      accent: "from-stone-500 to-amber-700",
      hero_image: null,
      detail: {
        client: "Three Circles",
        year: "2026",
        duration: "4 weeks",
        team: "Strategy, Design, Frontend, CMS",
        challenge: ["Generic previous site"],
        strategy: ["Improved structure and proof"],
        build: [{ label: "Platform", value: "Next.js + Sanity" }],
        results: [{ label: "Qualified inquiries", value: "+37%", hint: "First 60 days" }],
        gallery: [],
      },
    },
  ],
};

async function prepareDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(databasePath, JSON.stringify(seedDatabase, null, 2), "utf8");
}

async function main() {
  await prepareDatabase();

  const child = spawn("npm", ["run", "start"], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });

  const forwardSignal = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.on("SIGINT", forwardSignal);
  process.on("SIGTERM", forwardSignal);

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
