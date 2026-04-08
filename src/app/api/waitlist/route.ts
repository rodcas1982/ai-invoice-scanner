export const dynamic = 'force-static';

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Disabled for static deployment" }, { status: 503 });
}

export async function POST() {
  return NextResponse.json({ error: "Disabled for static deployment" }, { status: 503 });
}
