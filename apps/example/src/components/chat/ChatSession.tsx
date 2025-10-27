"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { Button } from "@/components/ui/button";
import { useRealtimePresence } from "@/hooks/useRealtimePresence";

export interface ChatSessionProps {
  threadId: string | null;
}

export function ChatSession({ threadId }: ChatSessionProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const presence = useRealtimePresence();

  const chat = useChatKit({
    api: {
      async getClientSecret(current) {
        const res = await fetch(`/api?current=${current ?? ""}`);
        const data = (await res.json()) as { clientSecret: string };
        return data.clientSecret;
      },
    },
    initialThread: threadId,
    history: { enabled: true },
    theme,
    header: { title: { text: "AI Specialist" } },
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const presenceLabel = useMemo(() => {
    if (!presence.size) return "No collaborators online";
    return `${presence.size} collaborator${presence.size > 1 ? "s" : ""} active`;
  }, [presence.size]);

  return (
    <section className="chat-session">
      <div className="chat-session__toolbar">
        <span>{presenceLabel}</span>
        <div className="chat-session__actions">
          <Button onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}>
            Toggle theme
          </Button>
          <Button variant="outline" onClick={() => chat.fetchUpdates()}>
            Refresh
          </Button>
        </div>
      </div>
      <ChatKit control={chat.control} className="chat-session__surface" />
    </section>
  );
}
