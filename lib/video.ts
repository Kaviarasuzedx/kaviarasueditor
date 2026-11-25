export function isVimeoVideo(src: string): boolean {
  try {
    const hostname = new URL(src).hostname.toLowerCase();
    return hostname === "vimeo.com" || hostname.endsWith(".vimeo.com");
  } catch {
    return false;
  }
}

type VimeoPlayerOptions = {
  autoplay?: boolean;
  background?: boolean;
  byline?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  portrait?: boolean;
  title?: boolean;
};

export function getVimeoPlayerUrl(src: string, options: VimeoPlayerOptions = {}): string {
  const url = new URL(src);
  Object.entries(options).forEach(([key, value]) => {
    url.searchParams.set(key, value ? "1" : "0");
  });
  return url.toString();
}
