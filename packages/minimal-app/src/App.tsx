import { useCallback, useMemo, useState } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';
import './App.css';

const SESSION_ENDPOINT = '/api/chatkit/session';

type ClientSecretResponse = {
  client_secret: string;
};

async function fetchClientSecret(existing?: string | null): Promise<string> {
  if (existing) {
    return existing;
  }

  const response = await fetch(SESSION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to fetch a ChatKit client secret.');
  }

  const payload = (await response.json()) as ClientSecretResponse;
  if (!payload.client_secret) {
    throw new Error('The session endpoint did not return a client secret.');
  }

  return payload.client_secret;
}

export default function App(): JSX.Element {
  const [error, setError] = useState<string | null>(null);

  const api = useMemo(
    () => ({
      async getClientSecret(existing?: string | null) {
        return fetchClientSecret(existing);
      },
    }),
    [],
  );

  const { control, fetchUpdates } = useChatKit({
    api,
    onError({ error: err }: { error: Error }) {
      setError(err.message);
    },
  });

  const handleRetry = useCallback(() => {
    setError(null);
    void fetchUpdates();
  }, [fetchUpdates]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Minimal ChatKit App</h1>
        <p>
          This example shows how to connect <code>useChatKit</code> to a backend
          that issues session tokens.
        </p>
      </header>

      {error ? (
        <div className="error-card" role="alert">
          <p>{error}</p>
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
        </div>
      ) : null}

      <ChatKit control={control} className="chatkit-frame" />
    </div>
  );
}
