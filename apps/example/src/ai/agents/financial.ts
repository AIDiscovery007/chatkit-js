import { z } from "zod";
import { getForecastPrompt } from "@/ai/prompts";

const forecastSchema = z.object({
  decision: z.string(),
  rationale: z.string(),
  confidence: z.number().min(0).max(1).default(0.5),
});

export type FinancialRecommendation = z.infer<typeof forecastSchema>;

export async function createFinancialRecommendation(transcript: string): Promise<FinancialRecommendation> {
  const prompt = getForecastPrompt();
  const plan = prompt.render(transcript);
  const [decision, rationale] = plan.split("\n", 2);
  return forecastSchema.parse({
    decision: decision?.replace(/^Decision:\s*/, "").trim() ?? "Hold",
    rationale: rationale?.replace(/^Rationale:\s*/, "").trim() ?? "Insufficient data",
    confidence: plan.includes("confidence: high") ? 0.9 : 0.6,
  });
}
