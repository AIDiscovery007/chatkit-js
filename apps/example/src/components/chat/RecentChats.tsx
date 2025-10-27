import Link from "next/link";
import { archiveChat, type ChatSummary } from "@/ai/chats/actions";
import { Button } from "@/components/ui/button";

export function RecentChats({ chats }: { chats: ChatSummary[] }) {
  if (!chats.length) {
    return <p>No conversations yet.</p>;
  }

  return (
    <div className="recent-chats">
      {chats.map((chat) => (
        <article key={chat.id} className="recent-chats__item">
          <div>
            <h3>{chat.title}</h3>
            <p>Last updated {new Date(chat.updatedAt).toLocaleTimeString()}</p>
          </div>
          <div className="recent-chats__actions">
            <Link href={`/${chat.id}`}>Open</Link>
            <form action={archiveChat.bind(null, chat.id)}>
              <Button type="submit" variant="outline">
                Archive
              </Button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
