import { NextRequest } from "next/server";
import { streamingResponse } from "@/lib/server-response";
import { summarizeConversation } from "@/ai/agents/reports";
import { triageConversation } from "@/ai/agents/triage";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const message = typeof body?.message === "string" ? body.message : "";
  const reportType = typeof body?.report === "string" ? body.report : "summary";

  const triage = await triageConversation(message);
  const report = await summarizeConversation({ transcript: message, format: reportType });

  return streamingResponse({
    triage,
    report,
    timestamp: new Date().toISOString(),
  });
}

export async function GET() {
  const secret = process.env.CHATKIT_CLIENT_SECRET ?? "demo-secret";
  return Response.json({ clientSecret: secret, expiresAt: Date.now() + 1000 * 60 * 10 });
}
