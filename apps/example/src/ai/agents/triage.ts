import { z } from "zod";
import { logStructuredEvent } from "@/lib/logger";

const triageSchema = z.object({
  urgency: z.enum(["low", "medium", "high"]).default("low"),
  topic: z.string().default("general"),
  handoff: z.boolean().default(false),
});

export type ConversationTriage = z.infer<typeof triageSchema>;

export async function triageConversation(message: string): Promise<ConversationTriage> {
  const normalized = message.toLowerCase();
  const urgency = normalized.includes("urgent") ? "high" : normalized.includes("soon") ? "medium" : "low";
  const topic = normalized.includes("finance")
    ? "financial"
    : normalized.includes("support")
      ? "support"
      : "general";
  const handoff = urgency === "high" || topic === "support";

  const triage = triageSchema.parse({ urgency, topic, handoff });
  logStructuredEvent("triage.complete", triage);
  return triage;
}
