/** EXAMPLES ONLY. Never publish these as reviews of real customers. */
export type Testimonial = {
  quote: string;
  context: string;
  attribution: string;
  sample: true;
};
export const sampleTestimonials: Testimonial[] = [
  { quote: "Every frame has a purpose. Every cut tells a story.", context: "My approach to video editing", attribution: "CREATIVE PHILOSOPHY", sample: true },
  { quote: "Blending creativity, rhythm and visual storytelling to make every video engaging.", context: "My editing style", attribution: "VISUAL STORYTELLING", sample:  true },
  { quote: "Turning raw footage and creative ideas into polished visual experiences.", context: "My commitment to every project", attribution: "MY CREATIVE APPROACH", sample:  true },
];