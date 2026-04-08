import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, readFileSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "..", "..", "data", "waitlist.json");

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
}

// Ensure data directory and file exist
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!existsSync(dir)) {
    return false;
  }
  if (!existsSync(DATA_FILE)) {
    const initial: WaitlistEntry[] = [];
    appendFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
  }
  return true;
}

// Read all entries
function readEntries(): WaitlistEntry[] {
  try {
    const data = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save all entries
function saveEntries(entries: WaitlistEntry[]) {
  appendFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

// Basic Auth helper
function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }
  
  const encoded = authHeader.slice(6);
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const [user, password] = decoded.split(":");
  
  const validUser = process.env.WAITLIST_STATS_USER || "admin";
  const validPass = process.env.WAITLIST_STATS_PASSWORD || "secret";
  
  return user === validUser && password === validPass;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const source = body?.source || "unknown";
    const entry: WaitlistEntry = {
      email,
      timestamp: new Date().toISOString(),
      source
    };

    ensureDataFile();
    const entries = readEntries();
    entries.push(entry);
    
    // Atomic write
    const fs = require("fs");
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));

    return NextResponse.json({ success: true, message: "Email registrado" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

// GET /api/waitlist/stats - Returns stats with Basic Auth
export async function GET(request: NextRequest) {
  // Check Basic Auth
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": "Basic realm=\"Waitlist Stats\""
        }
      }
    );
  }

  try {
    const entries = readEntries();
    
    // Total
    const total = entries.length;
    
    // By day
    const byDay: Record<string, number> = {};
    entries.forEach(e => {
      const day = e.timestamp.split("T")[0];
      byDay[day] = (byDay[day] || 0) + 1;
    });
    
    // By source
    const bySource: Record<string, number> = {};
    entries.forEach(e => {
      const src = e.source || "unknown";
      bySource[src] = (bySource[src] || 0) + 1;
    });

    return NextResponse.json({
      total,
      byDay: Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0])),
      bySource
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}