/**
 * Auto-corrects and repairs common LLM syntax mistakes in Mermaid diagrams.
 */

// Basic normalization and syntax auto-repair
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

  // 2. Ensure pipe labels are properly wrapped in quotes to prevent 'got SPACE' errors
  // e.g. |System Call| -> |"System Call"|
  chart = chart.replace(/\|([^|\n"]+)\|/g, (match, label) => {
    const cleanLabel = label.trim().replace(/"/g, "'");
    return `|"${cleanLabel}"|`;
  });

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
      // Convert legacy 'graph TD' / 'graph LR' to modern 'flowchart TD' / 'flowchart LR'
      if (lower.startsWith('graph ')) {
        line = line.replace(/^graph\s+/i, 'flowchart ');
      }
    }

    // Auto-quote double-parenthesis nodes (Circle)
    // e.g. A((User Mode)) -> A(("User Mode"))
    line = line.replace(/([a-zA-Z0-9_-]+)\(\(([^"\)\n]+)\)\)/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}(("${trimmedText.replace(/"/g, "'")}"))`;
    });

    // Auto-quote stadium nodes
    // e.g. A([Stadium]) -> A(["Stadium"])
    line = line.replace(/([a-zA-Z0-9_-]+)\(\[([^"\]\n]+)\]\)/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}(["${trimmedText.replace(/"/g, "'")}"])`;
    });

    // Auto-quote database nodes
    // e.g. A[(Database)] -> A[("(Database)")]
    line = line.replace(/([a-zA-Z0-9_-]+)\[\(([^"\)\n]+)\)\]/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}[("${trimmedText.replace(/"/g, "'")}")]`;
    });

    // Auto-quote curly brackets (Rhombus / Hexagon)
    // e.g. A{Condition} -> A{"Condition"} or A{{Hexagon}} -> A{{"Hexagon"}}
    line = line.replace(/([a-zA-Z0-9_-]+)\{\{([^"\}\n]+)\}\}/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}{{"${trimmedText.replace(/"/g, "'")}"}}`;
    });
    line = line.replace(/([a-zA-Z0-9_-]+)\{([^"\}\n]+)\}/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}{"${trimmedText.replace(/"/g, "'")}"}`;
    });

    // Auto-quote square bracket node labels that contain spaces or special chars
    // e.g. A[User Space] -> A["User Space"]
    line = line.replace(/([a-zA-Z0-9_-]+)\[([^"\]\n]+)\]/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}["${trimmedText.replace(/"/g, "'")}"]`;
    });

    // Auto-quote rounded bracket node labels that contain spaces or special chars
    // e.g. A(User Mode) -> A("User Mode")
    line = line.replace(/([a-zA-Z0-9_-]+)\(([^"\)\n]+)\)/g, (match, id, text) => {
      const trimmedText = text.trim();
      return `${id}("${trimmedText.replace(/"/g, "'")}")`;
    });

    // Clean up duplicate quotes
    line = line
      .replace(/\[\s*\"+/g, '["')
      .replace(/\"+\s*\]/g, '"]')
      .replace(/\(\s*\"+/g, '("')
      .replace(/\"+\s*\)/g, '")')
      .replace(/\{\s*\"+/g, '{"')
      .replace(/\"+\s*\}/g, '"}');

    sanitizedLines.push(line);
  }

  let result = sanitizedLines.join('\n').trim();

  // If no header was found, prepend flowchart TD
  if (!hasDiagramHeader) {
    result = `flowchart TD\n${result}`;
  }

  return result;
}

// Fallback aggressive repair for severely corrupted Mermaid charts
export function aggressiveSanitizeMermaid(rawChart: string): string {
  let chart = sanitizeMermaid(rawChart);
  
  // Strip out edge labels if they still cause parse failures
  // e.g. A -->|"label"| B -> A --> B
  chart = chart.replace(/(-->|-.->|==>|---|--)\s*\|[^|\n]+\|\s*/g, '$1 ');

  // Remove invalid style and class definitions
  const lines = chart.split('\n').filter(line => {
    const trimmed = line.trim().toLowerCase();
    return !trimmed.startsWith('style ') && !trimmed.startsWith('classdef ') && !trimmed.startsWith('class ');
  });

  return lines.join('\n');
}
