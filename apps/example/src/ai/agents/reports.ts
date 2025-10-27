import { getReportPrompt } from "@/ai/prompts/analysts/reports";
import { renderMarkdown } from "@/lib/markdown";

export interface ReportRequest {
  transcript: string;
  format: string;
}

export interface GeneratedReport {
  format: string;
  content: string;
}

export async function summarizeConversation(request: ReportRequest): Promise<GeneratedReport> {
  const prompt = getReportPrompt(request.format);
  const summary = prompt.render(request.transcript);
  const content = await renderMarkdown(summary);
  return { format: request.format, content };
}
