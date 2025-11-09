import {
  format,
  parseISO,
  isValid,
  addDays,
  subDays,
  differenceInDays,
} from "date-fns";

/**
 * Format a date to string with specified format
 */
export const formatDate = (
  date: Date | string,
  formatStr: string = "dd/MM/yyyy"
): string => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, formatStr) : "";
};

/**
 * Parse ISO string to Date object
 */
export const parseISODate = (dateStr: string): Date | null => {
  const date = parseISO(dateStr);
  return isValid(date) ? date : null;
};

/**
 * Add days to a date
 */
export const addDaysToDate = (date: Date | string, days: number): Date => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return addDays(parsedDate, days);
};

/**
 * Subtract days from a date
 */
export const subtractDaysFromDate = (
  date: Date | string,
  days: number
): Date => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return subDays(parsedDate, days);
};

/**
 * Get difference in days between two dates
 */
export const getDaysDifference = (
  dateLeft: Date | string,
  dateRight: Date | string
): number => {
  const parsedDateLeft =
    typeof dateLeft === "string" ? parseISO(dateLeft) : dateLeft;
  const parsedDateRight =
    typeof dateRight === "string" ? parseISO(dateRight) : dateRight;
  return differenceInDays(parsedDateLeft, parsedDateRight);
};

/**
 * Check if date string is valid
 */
export const isValidDate = (dateStr: string): boolean => {
  const date = parseISO(dateStr);
  return isValid(date);
};
