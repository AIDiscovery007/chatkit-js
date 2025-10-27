export async function renderMarkdown(markdown: string): Promise<string> {
  // Placeholder renderer: pass through the content with minimal formatting.
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}
