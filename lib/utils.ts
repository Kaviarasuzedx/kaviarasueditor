import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Resolve conditional classes without conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
