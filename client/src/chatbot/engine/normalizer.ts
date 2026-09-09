/**
 * Normalizes user input by cleaning whitespace and standardizing transliterations.
 */
export function normalizeInput(input: string): string {
  if (!input) return '';

  return input
    .trim()
    .toLowerCase()
    .replace(/[?!,.:;'"()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Checks if any keyword matches within the normalized string as a whole or substring.
 */
export function matchesAnyKeyword(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some(kw => {
    const kwLower = kw.toLowerCase();
    // Support regex boundaries for Latin, or simple includes for Devanagari
    if (/[\u0900-\u097F]/.test(kw)) {
      return lower.includes(kwLower);
    }
    const regex = new RegExp(`(^|\\s)${kwLower}(\\s|$)`, 'i');
    return regex.test(lower) || lower.includes(kwLower);
  });
}
