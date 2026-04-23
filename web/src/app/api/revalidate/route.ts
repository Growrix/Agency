import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path") || "/blog";

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, message: "REVALIDATE_SECRET is not configured." },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret." }, { status: 401 });
  }

  revalidatePath(path);
  revalidatePath("/blog");

  return NextResponse.json({ ok: true, revalidated: [path, "/blog"] });
}
