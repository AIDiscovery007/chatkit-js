export function SessionHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="session-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="session-header__meta">
        <span>Streaming mode</span>
        <span>Realtime sync enabled</span>
      </div>
    </header>
  );
}
