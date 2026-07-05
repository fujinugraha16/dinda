export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v");

      if (!videoId && parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
      }

      if (!videoId && parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
      }
    } else if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1) || null;
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  } catch {
    return null;
  }
}
