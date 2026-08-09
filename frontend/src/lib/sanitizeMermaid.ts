/**
 * Auto-corrects and repairs common LLM syntax mistakes in Mermaid diagrams.
 */
export function sanitizeMermaid(rawChart: string): string {
  if (!rawChart || typeof rawChart !== 'string') return '';

  let chart = rawChart
    .replace(/^```mermaid\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/\s*```$/, '')
    .trim();

  // 1. Fix common invalid arrow edge labels like `-->|label|>` or `-->|label|->`
  chart = chart
    .replace(/(-->|-.->|==>|---|--)\s*\|([^|\n]+)\|\s*>/g, '$1|$2| ')
    .replace(/(-->|-.->|==>|---|--)\s*\|([^|\n]+)\|\s*->/g, '$1|$2| ')
    .replace(/\|\s*>/g, '| ')
    .replace(/\|\s*->/g, '| ');

  const lines = chart.split('\n');
  const sanitizedLines: string[] = [];

  let hasDiagramHeader = false;
  const validHeaders = [
    'flowchart', 'graph', 'sequencediagram', 'classdiagram', 
    'statediagram', 'erdiagram', 'journey', 'gantt', 'pie', 'quadrantchart',
    'mindmap', 'timeline', 'gitgraph', 'c4context'
  ];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('%%')) {
      sanitizedLines.push(line);
      continue;
    }

    const lower = trimmed.toLowerCase();
    if (validHeaders.some(h => lower.startsWith(h))) {
      hasDiagramHeader = true;
    }

    // Auto-quote square bracket node labels that contain parentheses, colons, or slashes if not quoted
    // e.g. A[User Space (User Mode)] -> A["User Space (User Mode)"]
    line = line.replace(/([a-zA-Z0-9_-]+)\[([^"\]\n]+)\]/g, (match, id, text) => {
      const trimmedText = text.trim();
      if (
        trimmedText.includes('(') || 
        trimmedText.includes(')') || 
        trimmedText.includes(':') || 
        trimmedText.includes(';') || 
        trimmedText.includes('&') || 
        trimmedText.includes('/') || 
        trimmedText.includes('\\') || 
        trimmedText.includes('-')
      ) {
        return `${id}["${trimmedText.replace(/"/g, "'")}"]`;
      }
      return match;
    });

    sanitizedLines.push(line);
  }

  let result = sanitizedLines.join('\n').trim();

  // If no header was found, prepend flowchart TD
  if (!hasDiagramHeader) {
    result = `flowchart TD\n${result}`;
  }

  return result;
}
