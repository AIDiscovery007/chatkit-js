import { logStructuredEvent } from "@/lib/logger";

export async function transcribeAudio(file: File): Promise<string> {
  logStructuredEvent("transcription.start", { name: file.name, size: file.size });
  await new Promise((resolve) => setTimeout(resolve, 150));
  logStructuredEvent("transcription.end", { name: file.name });
  return `Transcription for ${file.name}`;
}

export async function dispatchRealtimeUpdate(event: string, payload: Record<string, unknown>): Promise<void> {
  logStructuredEvent("realtime.dispatch", { event, payload });
}
