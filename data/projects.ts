/**
 * SAMPLE PORTFOLIO CONTENT — NO CLAIM OF CLIENT AUTHORSHIP.
 * Every card is a fictional creative treatment used to demonstrate the website.
 * The videos point to third-party stock-footage previews which may be unavailable
 * or prohibit embedding. Replace all entries with owned work before launch.
 */
export const workFilters = [
  "All",
  "Ads",
  "Commercials",
  "Cinematic",
  "Social",
  "Reels & Shorts",
  "YouTube",
] as const;

export type WorkFilter = (typeof workFilters)[number];
export type WorkCategory = Exclude<WorkFilter, "All">;

export type Project = {
  slug: string;
  title: string;
  category: "Commercial" | "Cinematic" | "Social" | "Motion" | "Ads" | "YouTube" | "Reels & Shorts";
  filters: WorkCategory[];
  description: string;
  brief: string;
  approach: string;
  poster: string;
  videoSrc: string;
  sourcePage: string;
  /** Indicative fictional edit length; not the measured runtime of the stock clip. */
  duration: string;
  /** Intended delivery aspect ratio, not a verification of the demo stock clip. */
  format: "16:9" | "9:16";
  /** Intended output resolution, not the resolution of the linked demo video. */
  resolution: "1080p" | "4K";
  year: string;
  tools: string[];
  credits: { role: string; name: string }[];
  deliverables: string[];
  accent: string;
  cardShape: "portrait" | "landscape" | "square";
  
};


const stock = {
  landscape: {
    videoSrc:
      "https://player.vimeo.com/video/1220423991",
    sourcePage:
      "https://vimeo.com/reviews/3cbfd617-b610-44a3-99ab-0747ba8c8706/videos/1220423991",
    videoType: "vimeo",
  },
  mountains: {
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-sunny-mountain-range-42494-large.mp4",
    sourcePage:
      "https://mixkit.co/free-stock-video/aerial-shot-of-a-sunny-mountain-range-42494/",
    videoType: "mp4",
  },
  summit: {
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mountain-top-43129-large.mp4",
    sourcePage:
      "https://mixkit.co/free-stock-video/aerial-view-of-a-mountain-top-43129/",
    videoType: "mp4",
  },
  clouds: {
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-zoom-over-cloudy-hills-101508-large.mp4",
    sourcePage:
      "https://mixkit.co/free-stock-video/aerial-zoom-over-cloudy-hills-101508/",
    videoType: "mp4",
  },
} as const;



export const portfolioProjects: Project[] = [
  {
    slug: "hidden-strengths",
    title: "Discover Your Hidden Strengths",
    category: "YouTube",
    filters: ["YouTube"],
    description:
      "Discover your hidden strengths through 24 simple questions and identify what you're naturally good at.",
    brief:
      "An educational YouTube video designed to help viewers discover their potential, understand their skills, and explore career paths that match their strengths.",
    approach:
      "Create an engaging YouTube edit with clear storytelling, visual pacing, and supporting visuals that make self-discovery easier to understand.",
    poster: "/posters/hidden-strengths.svg",
    videoSrc: "https://player.vimeo.com/video/1249912662",
    sourcePage: "https://vimeo.com/1249912662",
    duration: "00:32",
    format: "16:9",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro", "After Effects"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["YouTube video", "16:9 export"],
    accent: "#a7b8d5",
    cardShape: "landscape",
  },
  {
    slug: "alec-legal-saas",
    title: "Alec – Legal Document Checker",
    category: "Motion",
    filters: ["Ads", "Commercials"],
    description:
      "A SaaS motion graphic animation introducing Alec, a legal document checking solution.",
    brief:
      "An animated product presentation designed to introduce a legal document checker and communicate its functionality through motion graphics.",
    approach:
      "Use animated graphics, typography, and visual transitions to explain the product in a clean and engaging way.",
    poster: "/posters/alec-legal-saas.svg",
    videoSrc: "https://player.vimeo.com/video/1220424374",
    sourcePage: "https://vimeo.com/1220424374",
    duration: "00:49",
    format: "16:9",
    resolution: "1080p",
    year: "2026",
    tools: ["After Effects"],
    credits: [{ role: "Motion graphics", name: "Portfolio work" }],
    deliverables: ["SaaS animation", "Motion graphics", "16:9 export"],
    accent: "#8db8b0",
    cardShape: "landscape",
  },
  {
    slug: "stranger-things-animation",
    title: "Stranger Things – Title Animation",
    category: "Cinematic",
    filters: ["Cinematic"],
    description:
      "A title sequence animation created in Adobe After Effects.",
    brief:
      "A title animation study inspired by the cinematic visual atmosphere of Stranger Things.",
    approach:
      "Build a cinematic title sequence using typography, animation, atmosphere, and visual effects.",
    poster: "/posters/stranger-things.svg",
    videoSrc: "https://player.vimeo.com/video/1220424375",
    sourcePage: "https://vimeo.com/1220424375",
    duration: "00:00",
    format: "16:9",
    resolution: "1080p",
    year: "2026",
    tools: ["After Effects"],
    credits: [{ role: "Animation", name: "Portfolio work" }],
    deliverables: ["Title sequence", "16:9 export"],
    accent: "#c66d6d",
    cardShape: "landscape",
  },
  {
    slug: "prawn-prepper-fry",
    title: "Prawn Prepper Fry",
    category: "Social",
    filters: ["Social", "Reels & Shorts"],
    description:
      "A food-making video showcasing the preparation of a delicious prawn dish.",
    brief:
      "A vertical food video showcasing the cooking process through engaging visuals and a social-media-friendly edit.",
    approach:
      "Focus on food visuals, rhythmic cuts, and an engaging presentation of the cooking process.",
    poster: "/posters/prawn-prepper.svg",
    videoSrc: "https://player.vimeo.com/video/1249914134",
    sourcePage: "https://vimeo.com/1249914134",
    duration: "00:31",
    format: "9:16",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["Food reel", "9:16 export"],
    accent: "#e3a36b",
    cardShape: "portrait",
  },
  {
    slug: "sleep-company",
    title: "The Sleep Company",
    category: "Ads",
    filters: ["Ads", "Social", "Reels & Shorts"],
    description:
      "A social media advertisement showcasing a product from The Sleep Company.",
    brief:
      "A vertical social media advertisement designed to showcase a product and create an engaging promotional experience.",
    approach:
      "Combine product-focused visuals, dynamic editing, and promotional storytelling to capture attention.",
    poster: "/posters/sleep-company.svg",
    videoSrc: "https://player.vimeo.com/video/1249914136",
    sourcePage: "https://vimeo.com/1249914136",
    duration: "01:01",
    format: "9:16",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro", "After Effects"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["Social media ad", "9:16 export"],
    accent: "#b6c9a6",
    cardShape: "portrait",
  },
  {
    slug: "armora-skincare",
    title: "Armora – Skincare Reel",
    category: "Commercial",
    filters: ["Commercials", "Ads", "Reels & Shorts"],
    description:
      "A skincare promotional reel featuring Armora.",
    brief:
      "A vertical promotional video for a skincare brand designed for social media.",
    approach:
      "Present the skincare product with polished visuals, smooth transitions, and a premium advertising style.",
    poster: "/posters/armora.svg",
    videoSrc: "https://player.vimeo.com/video/1220422244",
    sourcePage: "https://vimeo.com/1220422244",
    duration: "01:49",
    format: "9:16",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro", "After Effects"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["Skincare reel", "9:16 export"],
    accent: "#d4a6a8",
    cardShape: "portrait",
  },
  {
    slug: "chennai-silks",
    title: "Chennai Silks",
    category: "Ads",
    filters: ["Ads", "Social", "Reels & Shorts"],
    description:
      "A social media advertisement created for Chennai Silks.",
    brief:
      "A vertical social media promotional video designed to showcase the brand through an engaging visual presentation.",
    approach:
      "Use promotional editing, visual rhythm, and engaging transitions to create an advertisement suited for social media.",
    poster: "/posters/chennai-silks.svg",
    videoSrc: "https://player.vimeo.com/video/1249914135",
    sourcePage: "https://vimeo.com/1249914135",
    duration: "01:00",
    format: "9:16",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro", "After Effects"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["Social media ad", "9:16 export"],
    accent: "#c8a477",
    cardShape: "portrait",
  },
  {
    slug: "anandha-vilas",
    title: "Anandha Vilas",
    category: "Social",
    filters: ["Social", "Reels & Shorts"],
    description:
      "A food vlog promotional video showcasing Anandha Vilas.",
    brief:
      "A vertical food promotion designed to showcase a restaurant through a food-vlog-style video.",
    approach:
      "Highlight food, atmosphere, and visual storytelling through engaging short-form editing.",
    poster: "/posters/anandha-vilas.svg",
    videoSrc: "https://player.vimeo.com/video/1249914133",
    sourcePage: "https://vimeo.com/1249914133",
    duration: "00:49",
    format: "9:16",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["Food promotional reel", "9:16 export"],
    accent: "#d9a66c",
    cardShape: "portrait",
    
  },
  {
    slug: "farmland-real-estate",
    title: "Farmland Real Estate",
    category: "Ads",
    filters: ["Ads", "Commercials", "Reels & Shorts"],
    description:
      "A farmland promotional advertisement created using Premiere Pro and After Effects.",
    brief:
      "A vertical real estate advertisement designed to promote farmland through video editing and motion graphics.",
    approach:
      "Combine promotional visuals, motion graphics, text animation, and dynamic transitions to present farmland attractively.",
    poster: "/posters/farmland.svg",
    videoSrc: "https://player.vimeo.com/video/1249917113",
    sourcePage: "https://vimeo.com/1249917113",
    duration: "01:22",
    format: "9:16",
    resolution: "1080p",
    year: "2026",
    tools: ["Premiere Pro", "After Effects"],
    credits: [{ role: "Video editing", name: "Portfolio work" }],
    deliverables: ["Real estate ad", "Motion graphics", "9:16 export"],
    accent: "#a8b99b",
    cardShape: "portrait",
  },
  {
    slug: "2d-character-animation",
    title: "2D Character Animation",
    category: "Motion",
    filters: ["Cinematic", "Social"],
    description:
      "A collection of 2D character animations showcasing character movement and animation.",
    brief:
      "A collection of character animation work highlighting different 2D animation sequences.",
    approach:
      "Showcase character movement, expressive animation, and animation timing through a collection of sequences.",
    poster: "/posters/2d-animation.svg",
    videoSrc: "https://player.vimeo.com/video/1220424902",
    sourcePage: "https://vimeo.com/1220424902",
    duration: "00:47",
    format: "16:9",
    resolution: "1080p",
    year: "2026",
    tools: ["After Effects"],
    credits: [{ role: "Animation", name: "Portfolio work" }],
    deliverables: ["2D animation showcase", "16:9 export"],
    accent: "#b8a5d6",
    cardShape: "landscape",
  },
  
];

/** Four showcase cards shown on the homepage. */
export const featuredProjects = portfolioProjects.slice(0, 4);

/** Replace with the editor's own showreel before publication. */
export const demoShowreel = {
  title: "Showreel preview",
  poster: "/posters/showreel.svg",
  ...stock.landscape,
  isDemo: true,
};

