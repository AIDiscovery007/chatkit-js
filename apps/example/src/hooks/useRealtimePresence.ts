"use client";

import { useEffect, useState } from "react";
import { dispatchRealtimeUpdate } from "@/ai/chats/workers";

export function useRealtimePresence() {
  const [members, setMembers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setMembers((prev) => {
        const next = new Set(prev);
        const id = `agent-${Math.ceil(Math.random() * 5)}`;
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }, 4000);

    dispatchRealtimeUpdate("presence", { size: members.size }).catch(() => undefined);

    return () => {
      clearInterval(interval);
    };
  }, [members.size]);

  return {
    members,
    size: members.size,
  };
}
