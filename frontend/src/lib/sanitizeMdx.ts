/**
 * Robust sanitizer for markdown content passed to MDXEditor.
 * Strips broken nested quotes from HTML style attributes and converts them
 * to clean single-quoted attributes to prevent MDX parser (micromark) syntax errors.
 */
export function sanitizeMdx(raw: string | null | undefined): string {
  if (!raw) return '';
  let text = String(raw);

  // 1. Fix <span style="..."> tags with nested quotes
  text = text.replace(/<span\s+style=["']([^>]*?)["']>/gi, (_, styleContent) => {
    const cleanStyle = styleContent.replace(/["']/g, '').trim();
    return `<span style='${cleanStyle}'>`;
  });

  // 2. Fix <mark style="..."> tags with nested quotes
  text = text.replace(/<mark\s+style=["']([^>]*?)["']>/gi, (_, styleContent) => {
    const cleanStyle = styleContent.replace(/["']/g, '').trim();
    return `<mark style='${cleanStyle}'>`;
  });

  // 3. Fix <div align="..."> tags
  text = text.replace(/<div\s+align=["']([^>]*?)["']>/gi, (_, alignVal) => {
    const cleanAlign = alignVal.replace(/["']/g, '').trim();
    return `<div align='${cleanAlign}'>`;
  });

  // 4. Catch-all for any malformed attributes with nested double quotes
  text = text.replace(/style=["']([^>]*?)["']/gi, (_, inner) => {
    const cleaned = inner.replace(/["']/g, '').trim();
    return `style='${cleaned}'`;
  });

  return text;
}
