import { NextRequest, NextResponse } from "next/server";
import { verifyDiscordRequest } from "./verify";
import { handleInteraction } from "./handler";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const isValid = await verifyDiscordRequest(req);
  
  if (!isValid) {
    return new NextResponse("INVALID_SIGNATURE", { status: 401 });
  }
  
  const body = await req.json();
  return handleInteraction(body);
}
