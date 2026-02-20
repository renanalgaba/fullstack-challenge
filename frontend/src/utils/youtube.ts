export function extractVideoId(url: string): string {
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : '';
}
