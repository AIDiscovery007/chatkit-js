export function logStructuredEvent(event: string, payload: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${event}`, payload);
  }
}
