export function streamingResponse(payload: unknown) {
  const body = JSON.stringify(payload, null, 2);
  return new Response(body, {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}
