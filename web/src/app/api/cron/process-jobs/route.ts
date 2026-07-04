import { NextResponse } from "next/server";
import { enqueueNotificationRetriesFromLog, runDueJobs } from "@/server/domain/jobs";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const enqueued = await enqueueNotificationRetriesFromLog();
  const result = await runDueJobs(50);

  await recordAuditLog({
    level: "info",
    action: "cron.process_jobs",
    metadata: {
      enqueued,
      processed: result.processed,
      succeeded: result.succeeded,
      failed: result.failed,
      skipped: result.skipped,
    },
  });

  return NextResponse.json({ ok: true, enqueued, ...result });
}
