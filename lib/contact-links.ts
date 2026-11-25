/** Public contact points. An absent value produces honest, non-clickable UI. */
export const contactLinks = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? "",
  behance: process.env.NEXT_PUBLIC_BEHANCE_URL?.trim() ?? "",
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
