/** Public contact points. An absent value produces honest, non-clickable UI. */
export const contactLinks = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL?.trim() ?? "",
  x: process.env.NEXT_PUBLIC_X_URL?.trim() ?? "",
  fiverr: process.env.NEXT_PUBLIC_FIVERR_URL?.trim() ?? process.env.NEXT_PUBLIC_BEHANCE_URL?.trim() ?? "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL?.trim() ?? "",
};

export function safeSocialUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
