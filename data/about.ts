/**
 * Editorial portfolio copy. Do not infer client results or personal credentials
 * from this sample; replace the illustrative journey with verified milestones.
 */
export type SkillIcon = "cut" | "palette" | "audio" | "motion" | "story";
export type CreativeSkill = {
  number: string;
  title: string;
  description: string;
  icon: SkillIcon;
  specialties: readonly string[];
};

export const creativeSkills: readonly CreativeSkill[] = [
  { number: "01", title: "Creative editing", icon: "cut", description: "Story structure, confident timing and the invisible cuts that keep viewers watching.", specialties: ["Commercial pacing", "Narrative flow"] },
  { number: "02", title: "Color & atmosphere", icon: "palette", description: "A consistent visual mood that makes footage feel intentional and unmistakably yours.", specialties: ["Look development", "Visual continuity"] },
  { number: "03", title: "Sound design", icon: "audio", description: "Impact, texture, silence and music shaped as one part of the picture.", specialties: ["Sound layering", "Music-led edits"] },
  { number: "04", title: "Motion graphics", icon: "motion", description: "Type, transitions and visual accents that clarify ideas instead of distracting from them.", specialties: ["Animated typography", "Motion accents"] },
  { number: "05", title: "Storyboarding", icon: "story", description: "Thinking through the sequence before the first cut, from the hook to the final beat.", specialties: ["Visual planning", "Shot selection"] },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
  poster: string;
};

export const editorialJourney: readonly Milestone[] = [
  {
    year: "2022",
    title: "Discover the rhythm",
    poster: "/posters/discover-the-rhythm-career.svg",
    description:
      "My creative journey began with curiosity about video editing, exploring visuals, transitions, timing and the art of storytelling.",
  },
  {
    year: "2023",
    title: "Practice the craft",
    poster: "/posters/practice-the-craft.svg",
    description:
      "I started learning professional editing tools, experimenting with different styles and building my creative foundation through practice.",
  },
  {
    year: "2024",
    title: "Develop my creative eye",
    poster: "/posters/develop-my-creative-eye-v2.svg",
    description:
      "I focused on improving my editing skills, exploring cinematic storytelling, motion graphics, sound design and visual creativity.",
  },
  {
    year: "2025",
    title: "Started Freelancing",
    poster: "/posters/started-freelancing.svg",
    description:
      "I took my editing skills into the freelance world, working on creative projects, collaborating with clients and delivering videos for different platforms.",
  },
  {
    year: "2026",
    title: "Professional Agency Collaborations",
    poster: "/posters/professional-agency-collaborations.svg",
    description:
      "I stepped into professional creative environments, collaborating with agencies and working on brand campaigns, commercial videos and engaging digital content.",
  },
];

export const creativeTools = [
  { label: "Adobe Premiere Pro", caption: "Picture editing", logo: "adobe-premiere-pro.svg" },
  { label: "Adobe After Effects", caption: "Motion & compositing", logo: "adobe-after-effects.svg" },
  { label: "Adobe Media Encoder", caption: "Encoding & delivery", logo: "adobe-media-encoder.svg" },
  { label: "Adobe Photoshop", caption: "Image editing", logo: "adobe-photoshop.svg" },
  { label: "Adobe Illustrator", caption: "Vector artwork", logo: "adobe-illustrator.svg" },
  { label: "DaVinci Resolve Studio", caption: "Color grading & finishing", logo: "davinci-resolve.png" },
  { label: "Higgsfield AI", caption: "Generative video", logo: "higgsfield.png" },
  { label: "Google Flow", caption: "AI filmmaking", logo: "google-flow.png" },
  { label: "Claude", caption: "AI-assisted editing", logo: "claude.svg" },
] as const;

export const valueProps = [
  { number: "01", title: "A story-first mindset", text: "Every transition, beat and graphic should help the viewer feel or understand something." },
  { number: "02", title: "One cohesive finish", text: "Pacing, sound, typography and color are considered together—not treated as separate add-ons." },
  { number: "03", title: "Built for the destination", text: "A 9:16 hook and a 16:9 brand film tell stories differently. The format shapes the edit." },
] as const;

export const behindTheScenes = [
  { src: "/about/edit-suite-timeline.svg", alt: "Illustration of a multi-track video editing workspace", title: "The timeline", label: "Editing workflow illustration" },
  { src: "/about/sound-lab-timeline.svg", alt: "Illustration of multitrack audio editing with waveform controls", title: "The sound", label: "Sound workflow illustration" },
  { src: "/about/color-room-no-circles.svg", alt: "Illustration of a video color-grading workspace and color wheels", title: "The finish", label: "Color workflow illustration" },
] as const;
