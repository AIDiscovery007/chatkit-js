import { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseChatParams } from "@/lib/routing";
import { ChatSession } from "@/components/chat/ChatSession";

export interface ChatSessionPageProps {
  params: { chatId?: string[] };
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateMetadata({ params }: ChatSessionPageProps): Metadata {
  const { threadId } = parseChatParams(params.chatId);
  return {
    title: threadId ? `Chat · ${threadId}` : "New Chat",
  };
}

export default function ChatSessionPage({ params }: ChatSessionPageProps) {
  const { threadId } = parseChatParams(params.chatId);
  if (params.chatId && !threadId) {
    notFound();
  }

  return <ChatSession threadId={threadId} />;
}
