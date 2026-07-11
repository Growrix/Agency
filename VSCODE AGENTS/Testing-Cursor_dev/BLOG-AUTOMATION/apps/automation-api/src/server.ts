import { createApp } from "./app";

const port = Number(process.env.APP_PORT ?? 4010);
const app = createApp();
const close = app.locals.close as (() => void) | undefined;

const server = app.listen(port, () => {
  console.log(`BLOG-AUTOMATION automation API listening on http://localhost:${port}`);
});

function shutdown() {
  close?.();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);