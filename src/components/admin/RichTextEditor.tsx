import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { useEffect, useRef } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  Link as LinkIcon, Image as ImageIcon, Code, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, Table as TableIcon, Minus,
} from "lucide-react";
import { marked } from "marked";
import TurndownService from "turndown";

const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
// Preserve tables
turndown.keep(["table", "thead", "tbody", "tr", "th", "td"]);

interface Props {
  /** Markdown value */
  value: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const lastEmitted = useRef<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "text-[hsl(148,72%,55%)] underline" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4 max-w-full" } }),
      Placeholder.configure({ placeholder: placeholder || "Empieza a escribir…" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: false, HTMLAttributes: { class: "tiptap-table" } }),
      TableRow, TableHeader, TableCell,
    ],
    content: value ? (marked.parse(value) as string) : "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[480px] px-4 py-4 focus:outline-none " +
          "prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl " +
          "prose-a:text-[hsl(148,72%,55%)] prose-strong:text-white prose-blockquote:border-[hsl(148,72%,45%)]",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const md = turndown.turndown(html);
      lastEmitted.current = md;
      onChange(md);
    },
  });

  // Sync external value changes (e.g., AI generation) into editor
  useEffect(() => {
    if (!editor) return;
    if (value === lastEmitted.current) return;
    const html = value ? (marked.parse(value) as string) : "";
    if (html !== editor.getHTML()) {
      editor.commands.setContent(html, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <style>{`
        .tiptap-table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        .tiptap-table th, .tiptap-table td { border: 1px solid hsl(0 0% 100% / 0.15); padding: 8px 12px; }
        .tiptap-table th { background: hsl(0 0% 100% / 0.05); font-weight: 600; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left; color: hsl(0 0% 100% / 0.3); pointer-events: none; height: 0;
        }
      `}</style>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const Btn = ({ onClick, active, disabled, title, children }: any) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded hover:bg-white/10 transition disabled:opacity-30 ${active ? "bg-[hsl(148,72%,45%)]/20 text-[hsl(148,72%,55%)]" : "text-white/70"}`}
    >
      {children}
    </button>
  );

  const setLink = () => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL del enlace", prev || "https://");
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("URL de la imagen");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const insertTable = () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-white/10 bg-black/20 sticky top-0 z-10">
      <Btn title="Deshacer" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo size={15} /></Btn>
      <Btn title="Rehacer" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo size={15} /></Btn>
      <Sep />
      <Btn title="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={15} /></Btn>
      <Btn title="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={15} /></Btn>
      <Btn title="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={15} /></Btn>
      <Sep />
      <Btn title="Negrita" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={15} /></Btn>
      <Btn title="Itálica" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={15} /></Btn>
      <Btn title="Subrayado" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={15} /></Btn>
      <Btn title="Tachado" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={15} /></Btn>
      <Btn title="Código" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={15} /></Btn>
      <Sep />
      <Btn title="Lista" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={15} /></Btn>
      <Btn title="Lista numerada" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={15} /></Btn>
      <Btn title="Cita" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={15} /></Btn>
      <Btn title="Línea horizontal" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={15} /></Btn>
      <Sep />
      <Btn title="Alinear izquierda" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={15} /></Btn>
      <Btn title="Centrar" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={15} /></Btn>
      <Btn title="Alinear derecha" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={15} /></Btn>
      <Sep />
      <Btn title="Enlace" active={editor.isActive("link")} onClick={setLink}><LinkIcon size={15} /></Btn>
      <Btn title="Imagen" onClick={addImage}><ImageIcon size={15} /></Btn>
      <Btn title="Tabla" onClick={insertTable}><TableIcon size={15} /></Btn>
    </div>
  );
}

const Sep = () => <span className="w-px h-5 bg-white/10 mx-1" />;
