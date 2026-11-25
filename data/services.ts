import type { AccordionItem } from "@/components/ui/Accordion";

export type ServicePreview = {
  number: string;
  title: string;
  caption: string;
  icon: "zap" | "clapper" | "smartphone" | "film";
  tags: string[];
};

/** Step 3 homepage previews: preserved for backwards compatibility. */
export const homeServices: ServicePreview[] = [
  { number: "01", title: "Ads that convert.", caption: "Every cut builds interest. Every second earns attention.", icon: "zap", tags: ["Brand campaigns", "Product spots"] },
  { number: "02", title: "Commercial storytelling.", caption: "A high-end finish, from the opening shot to the final frame.", icon: "clapper", tags: ["Brand films", "Promos"] },
  { number: "03", title: "Social, but cinematic.", caption: "Impact in seconds for Reels, Shorts and vertical platforms.", icon: "smartphone", tags: ["9:16 edits", "Short-form"] },
  { number: "04", title: "Films with feeling.", caption: "Emotion, sound, rhythm and color working in sync.", icon: "film", tags: ["Story edits", "Atmosphere"] },
];

export type ServiceDetail = {
  id: string;
  number: string;
  title: string;
  strapline: string;
  description: string;
  deliverables: readonly string[];
  formats: string;
  turnaround: string;
  artwork: string;
  artworkAlt: string;
  tags: readonly string[];
};

/**
 * Planning windows are indicative—not a promise or a published price.
 * Confirm timelines, revisions, usage rights and deliverables in each quote.
 */
export const services: readonly ServiceDetail[] = [
  {
    id: "ads-commercials", number: "01", title: "Ads & commercials", strapline: "Make the first second impossible to ignore.",
    description: "Product-led ads and brand films with strong openings, deliberate rhythm, punchy sound design and a finish that feels unmistakably premium.",
    deliverables: ["Creative assembly and polished master", "Brand-safe titles and sound design", "Platform cutdowns when scoped"],
    formats: "9:16 / 16:9 · 1080p / 4K", turnaround: "Indicative: 4–10 working days", artwork: "/services/ads.svg", artworkAlt: "Abstract cinematic product spotlight illustration", tags: ["Product spots", "Brand stories"]
  },
  {
    id: "social-content", number: "02", title: "Social media content", strapline: "Designed to stop the scroll.",
    description: "Fast, platform-native edits with compelling hooks, readable captions and clean pacing that keeps an idea moving from start to finish.",
    deliverables: ["Reels, Shorts and feed-ready exports", "Hook variations when scoped", "Captions, sound accents and transitions"],
    formats: "9:16 / 1:1 / 16:9 · 1080p / 4K", turnaround: "Indicative: 2–5 working days", artwork: "/services/social.svg", artworkAlt: "Abstract vertical social video artwork", tags: ["Reels", "Shorts", "Campaigns"]
  },
  {
    id: "cinematic-edits", number: "03", title: "Cinematic edits", strapline: "A feeling that stays after the final frame.",
    description: "Atmosphere-forward edits where story, movement, grading and music work together to make every shot feel like it belongs.",
    deliverables: ["Narrative edit and polished picture", "Mood-led color treatment", "Music and sound-design pass"],
    formats: "16:9 / 9:16 · 1080p / 4K", turnaround: "Indicative: 5–12 working days", artwork: "/services/cinematic.svg", artworkAlt: "Abstract cinematic landscape with warm sun and film frame", tags: ["Mood films", "Story edits"]
  },
  {
    id: "youtube", number: "04", title: "YouTube videos", strapline: "Long-form that never loses the thread.",
    description: "Thoughtful structure, clear audio and intelligent pacing for creators who want professional storytelling without unnecessary noise.",
    deliverables: ["Long-form story edit", "B-roll, lower-thirds and sound cleanup", "Chapter or short-form cutdowns if scoped"],
    formats: "16:9 · 1080p / 4K", turnaround: "Indicative: 4–10 working days", artwork: "/services/youtube.svg", artworkAlt: "Stylized horizontal editing and play-screen artwork", tags: ["Creator content", "Explainers"]
  },
  {
    id: "sound-design", number: "05", title: "Sound design", strapline: "You should feel the edit, not just see it.",
    description: "Sound that supports the picture: layered transitions, sonic identity, dialogue polishing and silence used with the same care as impact.",
    deliverables: ["Dialogue cleanup where practical", "Sound effects and transition design", "Balanced final mix for web delivery"],
    formats: "Audio for 9:16 / 16:9 · Stereo", turnaround: "Indicative: 2–6 working days", artwork: "/services/sound.svg", artworkAlt: "Abstract sound waveform and audio-channel artwork", tags: ["Mixing", "Transitions", "Impact"]
  },
  {
    id: "motion-graphics", number: "06", title: "Motion graphics", strapline: "Movement with a point of view.",
    description: "Distinctive typography, titles, lower thirds and graphic systems that make information more memorable while complementing the edit.",
    deliverables: ["Animated type and title sequences", "Lower thirds and graphic callouts", "Motion elements integrated into the edit"],
    formats: "9:16 / 16:9 · 1080p / 4K", turnaround: "Indicative: 3–8 working days", artwork: "/services/motion.svg", artworkAlt: "Abstract motion typography and geometric shapes artwork", tags: ["After Effects", "Animated type"]
  },
];

export const editingProcess = [
  { number: "01", title: "Brief", description: "We align on goal, audience, references, assets, deliverables and deadline before the timeline begins.", detail: "Define the story" },
  { number: "02", title: "Edit", description: "I build the structure, refine the rhythm, and bring picture, motion and sound into one direction.", detail: "Find the rhythm" },
  { number: "03", title: "Review", description: "A clear review round turns feedback into decisions; revision scope and rounds are agreed in advance.", detail: "Refine together" },
  { number: "04", title: "Deliver", description: "Final exports are checked for destination, aspect ratio, resolution and agreed deliverables.", detail: "Ready to publish" },
] as const;

export const serviceFaqs: AccordionItem[] = [
  { id: "formats", question: "Which formats and resolutions can you deliver?", answer: "Vertical 9:16 and horizontal 16:9 are both supported; square 1:1 can be scoped too. Exports can be 1080p or 4K where original footage and project requirements support it." },
  { id: "assets", question: "What do you need from me to start?", answer: "A simple brief, available footage and brand assets, a reference or two, intended platform, deadline and preferred outcome. Even a rough concept is enough to begin scoping the project." },
  { id: "revisions", question: "How do revision rounds work?", answer: "We agree the scope and number of review rounds in the quote. Consolidated, timestamped feedback helps revisions move quickly; major changes in direction can require a new estimate." },
  { id: "timeline", question: "Are the turnaround times guaranteed?", answer: "No. The ranges shown on this page are illustrative planning estimates, not a delivery commitment. Schedule depends on footage length, motion work, approvals, source condition and availability. Your confirmed quote sets the timeline." },
  { id: "files", question: "Will I receive editable project files?", answer: "Final video exports are included when scoped. Editable Premiere Pro or After Effects project files, third-party assets and licenses need to be agreed separately before the project begins." },
  { id: "music", question: "Do you provide music and stock footage?", answer: "I can discuss sourcing and integration, but music and stock usage rights depend on the license selected. Paid assets and usage permissions are quoted and approved before purchase." },
  { id: "pricing", question: "How much does an edit cost?", answer: "Pricing is custom to the scope: running time, footage volume, graphics complexity, turnaround, versions and revision rounds. Send your brief for a tailored quote—there are no invented flat rates on this site." },
];
