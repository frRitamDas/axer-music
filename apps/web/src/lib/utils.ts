import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names
 * @param inputs - Class names
 * @returns Merged class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
