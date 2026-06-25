// SEO validation utilities for blog posts
// Returns a list of checks with status: pass | warn | fail

export type CheckStatus = "pass" | "warn" | "fail";
export interface SeoCheck {
  id: string;
  label: string;
  status: CheckStatus;
  message: string;
  fix?: string;
}

interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  image_url: string;
  category: string;
}

const INTERNAL_PREFIXES = ["/", "https://ecologiarentable.es", "https://ecologiarentable"];

function isInternalLink(href: string) {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  return INTERNAL_PREFIXES.some((p) => href.startsWith(p));
}

function isExternalLink(href: string) {
  if (!href) return false;
  return /^https?:\/\//i.test(href) && !isInternalLink(href);
}

function extractMarkdownLinks(md: string): { text: string; href: string }[] {
  const out: { text: string; href: string }[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) out.push({ text: m[1], href: m[2] });
  return out;
}

function extractHeadings(md: string): { level: number; text: string }[] {
  const out: { level: number; text: string }[] = [];
  const lines = md.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) out.push({ level: m[1].length, text: m[2].trim() });
  }
  return out;
}

function wordCount(md: string) {
  const stripped = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~|\-]+/g, " ");
  return stripped.split(/\s+/).filter(Boolean).length;
}

function keywordDensity(text: string, keyword: string) {
  if (!keyword) return 0;
  const k = keyword.toLowerCase().trim();
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  const hay = " " + words.join(" ") + " ";
  // Count overlapping-safe occurrences of the phrase
  let count = 0;
  let idx = 0;
  while ((idx = hay.indexOf(" " + k + " ", idx)) !== -1) { count++; idx += k.length + 1; }
  return (count / words.length) * 100;
}

export function runSeoChecks(p: PostInput): SeoCheck[] {
  const checks: SeoCheck[] = [];
  const headings = extractHeadings(p.content);
  const links = extractMarkdownLinks(p.content);
  const internal = links.filter((l) => isInternalLink(l.href));
  const external = links.filter((l) => isExternalLink(l.href));
  const words = wordCount(p.content);
  const primaryKw = (p.meta_keywords.split(",")[0] || "").trim();

  // 1. Title
  if (!p.title) {
    checks.push({ id: "title", label: "Título", status: "fail", message: "Falta el título del post." });
  } else if (p.title.length < 30) {
    checks.push({ id: "title", label: "Título", status: "warn", message: `Título corto (${p.title.length} car.). Ideal 50-60.` });
  } else if (p.title.length > 70) {
    checks.push({ id: "title", label: "Título", status: "warn", message: `Título largo (${p.title.length} car.). Ideal ≤60.` });
  } else {
    checks.push({ id: "title", label: "Título", status: "pass", message: `${p.title.length} caracteres.` });
  }

  // 2. Meta title
  if (!p.meta_title) {
    checks.push({ id: "meta_title", label: "Meta título", status: "warn", message: "Sin meta título — usará el título.", fix: "Define meta título ≤58 car." });
  } else if (p.meta_title.length > 60) {
    checks.push({ id: "meta_title", label: "Meta título", status: "fail", message: `${p.meta_title.length}/60 — se cortará en SERPs.` });
  } else if (p.meta_title.length < 30) {
    checks.push({ id: "meta_title", label: "Meta título", status: "warn", message: `Corto (${p.meta_title.length}/58).` });
  } else {
    checks.push({ id: "meta_title", label: "Meta título", status: "pass", message: `${p.meta_title.length}/58.` });
  }

  // 3. Meta description
  if (!p.meta_description) {
    checks.push({ id: "meta_desc", label: "Meta descripción", status: "fail", message: "Falta meta descripción." });
  } else if (p.meta_description.length < 120) {
    checks.push({ id: "meta_desc", label: "Meta descripción", status: "warn", message: `Corta (${p.meta_description.length}/155). Ideal 140-155.` });
  } else if (p.meta_description.length > 160) {
    checks.push({ id: "meta_desc", label: "Meta descripción", status: "fail", message: `${p.meta_description.length}/160 — se truncará.` });
  } else {
    checks.push({ id: "meta_desc", label: "Meta descripción", status: "pass", message: `${p.meta_description.length}/155.` });
  }

  // 4. Slug
  if (!p.slug) {
    checks.push({ id: "slug", label: "Slug URL", status: "fail", message: "Slug obligatorio." });
  } else if (!/^[a-z0-9-]+$/.test(p.slug)) {
    checks.push({ id: "slug", label: "Slug URL", status: "fail", message: "Solo minúsculas, números y guiones." });
  } else if (p.slug.length > 75) {
    checks.push({ id: "slug", label: "Slug URL", status: "warn", message: `Slug largo (${p.slug.length}). Ideal ≤60.` });
  } else {
    checks.push({ id: "slug", label: "Slug URL", status: "pass", message: `/blog/${p.slug}` });
  }

  // 5. Excerpt
  if (!p.excerpt) {
    checks.push({ id: "excerpt", label: "Extracto", status: "warn", message: "Sin extracto. Mejora el CTR en listados." });
  } else if (p.excerpt.length < 80) {
    checks.push({ id: "excerpt", label: "Extracto", status: "warn", message: `Corto (${p.excerpt.length} car.). Ideal 100-160.` });
  } else {
    checks.push({ id: "excerpt", label: "Extracto", status: "pass", message: `${p.excerpt.length} caracteres.` });
  }

  // 6. Featured image
  if (!p.image_url) {
    checks.push({ id: "image", label: "Imagen destacada", status: "fail", message: "Sin imagen destacada (Open Graph)." });
  } else {
    checks.push({ id: "image", label: "Imagen destacada", status: "pass", message: "Configurada." });
  }

  // 7. Headings — exactly one H1
  const h1s = headings.filter((h) => h.level === 1);
  const h2s = headings.filter((h) => h.level === 2);
  if (h1s.length === 0) {
    checks.push({ id: "h1", label: "Encabezado H1", status: "warn", message: "Sin H1 en el contenido. El título de la página actúa como H1." });
  } else if (h1s.length > 1) {
    checks.push({ id: "h1", label: "Encabezado H1", status: "fail", message: `${h1s.length} H1 detectados. Debe haber solo uno.` });
  } else {
    checks.push({ id: "h1", label: "Encabezado H1", status: "pass", message: `1 H1: "${h1s[0].text.slice(0, 50)}"` });
  }

  // 8. H2 structure
  if (h2s.length === 0) {
    checks.push({ id: "h2", label: "Subtítulos H2", status: "warn", message: "Sin H2. Estructura el artículo en secciones." });
  } else if (h2s.length < 3) {
    checks.push({ id: "h2", label: "Subtítulos H2", status: "warn", message: `Solo ${h2s.length} H2. Ideal ≥3 para artículos largos.` });
  } else {
    checks.push({ id: "h2", label: "Subtítulos H2", status: "pass", message: `${h2s.length} H2 bien distribuidos.` });
  }

  // 9. Heading hierarchy (no jumps H2 → H4)
  let jump = false;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1) { jump = true; break; }
  }
  checks.push(
    jump
      ? { id: "h_order", label: "Jerarquía de encabezados", status: "warn", message: "Saltos detectados (ej. H2 → H4)." }
      : { id: "h_order", label: "Jerarquía de encabezados", status: "pass", message: "Orden correcto." },
  );

  // 10. Word count
  if (words < 300) {
    checks.push({ id: "words", label: "Extensión del contenido", status: "fail", message: `${words} palabras — muy corto. Mínimo 600.` });
  } else if (words < 600) {
    checks.push({ id: "words", label: "Extensión del contenido", status: "warn", message: `${words} palabras. Ideal ≥800.` });
  } else {
    checks.push({ id: "words", label: "Extensión del contenido", status: "pass", message: `${words} palabras.` });
  }

  // 11. Internal links — at least 2
  if (internal.length === 0) {
    checks.push({ id: "internal", label: "Enlaces internos", status: "fail", message: "Ningún enlace interno. Añade ≥2 a /servicios o /contacto." });
  } else if (internal.length < 2) {
    checks.push({ id: "internal", label: "Enlaces internos", status: "warn", message: `Solo ${internal.length} enlace interno. Ideal ≥2.` });
  } else {
    checks.push({ id: "internal", label: "Enlaces internos", status: "pass", message: `${internal.length} enlaces internos.` });
  }

  // 12. External links (informational)
  checks.push({
    id: "external", label: "Enlaces externos",
    status: external.length > 8 ? "warn" : "pass",
    message: external.length > 8 ? `${external.length} externos — quizá demasiados.` : `${external.length} enlaces externos.`,
  });

  // 13. Empty link text
  const emptyAnchors = links.filter((l) => !l.text.trim() || /^(aquí|click|ver más|leer más|here)$/i.test(l.text.trim()));
  if (emptyAnchors.length) {
    checks.push({ id: "anchors", label: "Texto de enlace", status: "warn", message: `${emptyAnchors.length} enlaces con texto poco descriptivo.` });
  } else if (links.length) {
    checks.push({ id: "anchors", label: "Texto de enlace", status: "pass", message: "Anchors descriptivos." });
  }

  // 14. Keyword presence (if defined)
  if (primaryKw) {
    const inTitle = p.title.toLowerCase().includes(primaryKw.toLowerCase());
    const inMeta = (p.meta_title + " " + p.meta_description).toLowerCase().includes(primaryKw.toLowerCase());
    const inH1 = h1s.some((h) => h.text.toLowerCase().includes(primaryKw.toLowerCase()));
    const inFirst = p.content.slice(0, 300).toLowerCase().includes(primaryKw.toLowerCase());
    const density = keywordDensity(p.content, primaryKw);

    if (!inTitle) checks.push({ id: "kw_title", label: "Keyword en título", status: "fail", message: `Falta "${primaryKw}" en el título.` });
    else checks.push({ id: "kw_title", label: "Keyword en título", status: "pass", message: "Presente." });

    if (!inMeta) checks.push({ id: "kw_meta", label: "Keyword en meta", status: "warn", message: "Añade la keyword al meta título o descripción." });
    else checks.push({ id: "kw_meta", label: "Keyword en meta", status: "pass", message: "Presente." });

    if (!inH1 && h1s.length) checks.push({ id: "kw_h1", label: "Keyword en H1", status: "warn", message: "No aparece en el H1." });

    if (!inFirst) checks.push({ id: "kw_intro", label: "Keyword en intro", status: "warn", message: "No aparece en los primeros 300 caracteres." });
    else checks.push({ id: "kw_intro", label: "Keyword en intro", status: "pass", message: "Aparece en la intro." });

    if (density < 0.3) checks.push({ id: "kw_density", label: "Densidad de keyword", status: "warn", message: `${density.toFixed(2)}% — baja. Ideal 0.5-2%.` });
    else if (density > 3) checks.push({ id: "kw_density", label: "Densidad de keyword", status: "fail", message: `${density.toFixed(2)}% — keyword stuffing.` });
    else checks.push({ id: "kw_density", label: "Densidad de keyword", status: "pass", message: `${density.toFixed(2)}%.` });
  } else {
    checks.push({ id: "kw_missing", label: "Keyword principal", status: "warn", message: "Define al menos una keyword en el campo Keywords." });
  }

  // 15. Images alt — markdown ![alt](src)
  const imgs = [...p.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
  const missingAlt = imgs.filter((m) => !m[1].trim()).length;
  if (imgs.length === 0) {
    checks.push({ id: "alt", label: "Imágenes en el cuerpo", status: "warn", message: "Sin imágenes en el contenido." });
  } else if (missingAlt > 0) {
    checks.push({ id: "alt", label: "Texto alternativo (alt)", status: "fail", message: `${missingAlt} imagen(es) sin alt.` });
  } else {
    checks.push({ id: "alt", label: "Texto alternativo (alt)", status: "pass", message: `${imgs.length} imagen(es) con alt.` });
  }

  // 16. Brand rule — never "Flex Fuel"
  if (/flex\s*fuel/i.test(p.content + " " + p.title + " " + p.meta_description)) {
    checks.push({ id: "brand", label: "Regla de marca", status: "fail", message: 'Aparece "Flex Fuel". Usa solo "Ecología Rentable".' });
  } else {
    checks.push({ id: "brand", label: "Regla de marca", status: "pass", message: "Sin términos prohibidos." });
  }

  return checks;
}

export function seoSummary(checks: SeoCheck[]) {
  const pass = checks.filter((c) => c.status === "pass").length;
  const warn = checks.filter((c) => c.status === "warn").length;
  const fail = checks.filter((c) => c.status === "fail").length;
  const score = Math.round((pass / checks.length) * 100);
  return { pass, warn, fail, total: checks.length, score, canPublish: fail === 0 };
}
