import { NextRequest } from "next/server";
import { streamingResponse } from "@/lib/server-response";
import { transcribeAudio } from "@/ai/chats/workers";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return new Response("Invalid file upload", { status: 400 });
  }

  const transcription = await transcribeAudio(file);
  return streamingResponse({ transcription });
}
