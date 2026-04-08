import { NextRequest, NextResponse } from "next/server";
import { appendFileSync } from "fs";
import { existsSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "..", "..", "data", "waitlist.txt");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Simple .txt storage (Sprint 1 - validate demand only)
    // TODO: replace with Supabase once backend is built
    const entry = `${email},${new Date().toISOString()}\n`;

    try {
      appendFileSync(DATA_FILE, entry);
    } catch {
      // File might not exist yet, try creating it
      const dir = path.dirname(DATA_FILE);
      if (!existsSync(dir)) {
        // skip - dir creation failed silently
      }
      appendFileSync(DATA_FILE, entry);
    }

    return NextResponse.json({ success: true, message: "Email registrado" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
