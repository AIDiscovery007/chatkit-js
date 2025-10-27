import { Suspense } from "react";
import { listRecentChats } from "@/ai/chats/actions";
import { RecentChats } from "@/components/chat/RecentChats";
import { SessionHeader } from "@/components/chat/SessionHeader";

export default async function Home() {
  const chats = await listRecentChats();

  return (
    <main>
      <SessionHeader title="Unified Inbox" description="Monitor live conversations and jump into threads instantly." />
      <Suspense fallback={<p>Loading conversations…</p>}>
        <RecentChats chats={chats} />
      </Suspense>
    </main>
  );
}
