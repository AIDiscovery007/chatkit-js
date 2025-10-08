# Minimal ChatKit App

This example shows how to embed the ChatKit web component inside a React
application using the helpers exposed by `@openai/chatkit-react`.

## Prerequisites

- Node.js 18+
- A server endpoint that returns a ChatKit client secret. This example assumes
  there is a `POST /api/chatkit/session` route that returns a JSON payload with
  a `client_secret` field.

## Getting started

Install dependencies and start the local development server:

```bash
pnpm install
pnpm --filter minimal-chatkit-app dev
```

The app is available at `http://localhost:5173`.

## How it works

- `useChatKit` bridges React state to the `<openai-chatkit>` web component.
- `App.tsx` retrieves a client secret from your backend and passes the required
  options to ChatKit.
- `index.html` loads the hosted `chatkit.js` bundle which registers the custom
  element on the page.

Customize the layout, theming, and behaviour by editing `App.tsx` and
forwarding additional options to `useChatKit`.
