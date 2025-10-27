"use server";

import { unstable_cache } from "next/cache";
import { logStructuredEvent } from "@/lib/logger";

export interface ChatSummary {
  id: string;
  title: string;
  updatedAt: string;
  unread: boolean;
}

const loadChats = unstable_cache(async (): Promise<ChatSummary[]> => {
  return [
    { id: "expansion", title: "Product expansion planning", updatedAt: new Date().toISOString(), unread: false },
    { id: "finance", title: "Annual budgeting workshop", updatedAt: new Date(Date.now() - 3600_000).toISOString(), unread: true },
    { id: "support", title: "Customer onboarding triage", updatedAt: new Date(Date.now() - 7200_000).toISOString(), unread: false },
  ];
}, ["chat-summaries"], { revalidate: 30 });

export async function listRecentChats(): Promise<ChatSummary[]> {
  const chats = await loadChats();
  logStructuredEvent("chats.list", { count: chats.length });
  return chats;
}

export async function archiveChat(id: string): Promise<void> {
  logStructuredEvent("chats.archive", { id });
}
