/**
 * Collection of common string utility functions
 */

/**
 * Capitalizes the first letter of a string
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if a string is empty or contains only whitespace
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Removes all whitespace from a string
 */
export const removeWhitespace = (str: string): string => {
  return str.replace(/\s+/g, "");
};

/**
 * Truncates a string to a specified length and adds ellipsis
 */
export const truncate = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
};

/**
 * Converts a string to slug format (lowercase, dash-separated)
 */
export const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Remove duplicate dashes
};

/**
 * Reverses a string
 */
export const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};

/**
 * Counts the occurrences of a substring in a string
 */
export const countOccurrences = (str: string, searchStr: string): number => {
  return str.split(searchStr).length - 1;
};

/**
 * Checks if a string is a valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
