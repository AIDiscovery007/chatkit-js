export function parseChatParams(segments?: string[]) {
  if (!segments || segments.length === 0) {
    return { threadId: null };
  }
  const [threadId] = segments;
  if (!threadId || threadId.trim().length === 0) {
    return { threadId: null };
  }
  return { threadId };
}
