// Renderizador Markdown simple para posts del blog.
// Soporta: ## H2, ### H3, **bold**, *italic*, [text](url), listas, tablas, párrafos, blockquotes.
import { Link } from "react-router-dom";
import { ReactNode } from "react";

function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // tokens: links, bold, italic
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      const url = m[3];
      const isInternal = url.startsWith("/");
      parts.push(isInternal
        ? <Link key={key++} to={url} className="text-primary underline underline-offset-2 hover:no-underline">{m[2]}</Link>
        : <a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">{m[2]}</a>
      );
    } else if (m[4]) {
      parts.push(<strong key={key++}>{m[5]}</strong>);
    } else if (m[6]) {
      parts.push(<em key={key++}>{m[7]}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function renderMarkdown(md: string): ReactNode[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0; let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty
    if (!line.trim()) { i++; continue; }

    // Tables: line with | and next line with |---
    if (line.includes("|") && lines[i + 1]?.match(/^\s*\|?[\s:|-]+\|/)) {
      const header = line.split("|").map((s) => s.trim()).filter(Boolean);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").map((s) => s.trim()).filter((_, idx, arr) => idx > 0 || lines[i].trimStart().startsWith("|") ? true : true));
        // simpler: split and trim, drop empty edges
        const cells = lines[i].split("|").map((s) => s.trim());
        if (cells[0] === "") cells.shift();
        if (cells[cells.length - 1] === "") cells.pop();
        rows[rows.length - 1] = cells;
        i++;
      }
      out.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>{header.map((h, j) => <th key={j} className="text-left px-4 py-2.5 font-semibold text-foreground">{parseInline(h)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-border">
                  {r.map((c, ci) => <td key={ci} className="px-4 py-2.5 text-muted-foreground align-top">{parseInline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      out.push(<h3 key={key++} className="text-lg md:text-xl font-bold mt-7 mb-3 text-foreground">{parseInline(line.slice(4))}</h3>);
      i++; continue;
    }
    if (line.startsWith("## ")) {
      out.push(<h2 key={key++} className="text-xl md:text-2xl font-bold mt-10 mb-4 text-foreground">{parseInline(line.slice(3))}</h2>);
      i++; continue;
    }
    if (line.startsWith("# ")) {
      // skip, already H1 in page header
      i++; continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const block: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) { block.push(lines[i].slice(2)); i++; }
      out.push(<blockquote key={key++} className="border-l-4 border-primary/40 pl-4 my-5 italic text-muted-foreground">{parseInline(block.join(" "))}</blockquote>);
      continue;
    }

    // Lists
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      out.push(<ul key={key++} className="list-disc pl-6 space-y-1.5 my-4 text-muted-foreground">{items.map((it, j) => <li key={j}>{parseInline(it)}</li>)}</ul>);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      out.push(<ol key={key++} className="list-decimal pl-6 space-y-1.5 my-4 text-muted-foreground">{items.map((it, j) => <li key={j}>{parseInline(it)}</li>)}</ol>);
      continue;
    }

    // Paragraph (consume consecutive non-empty non-special lines)
    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith(">") && !/^\s*[-*\d]/.test(lines[i]) && !lines[i].includes("|")) {
      para.push(lines[i]); i++;
    }
    out.push(<p key={key++} className="leading-relaxed mb-4 text-muted-foreground">{parseInline(para.join(" "))}</p>);
  }

  return out;
}
