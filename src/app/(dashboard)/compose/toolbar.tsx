"use client";

import { Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Undo,
  Redo,
  Link2,
  Image as ImageIcon,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  useEditorState({
    editor,
    selector: ({ editor }) => ({
      isH1: editor?.isActive("heading", { level: 1 }),
      isH2: editor?.isActive("heading", { level: 2 }),
      isH3: editor?.isActive("heading", { level: 3 }),
    }),
  });

  if (!editor) return null;

  const currentBlock = editor.isActive("heading", { level: 1 })
    ? "h1"
    : editor.isActive("heading", { level: 2 })
      ? "h2"
      : editor.isActive("heading", { level: 3 })
        ? "h3"
        : "p";

  return (
    <div className="flex items-center justify-between border-none bg-gray-100 px-2 py-1">
      <div className="flex items-center gap-1">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={currentBlock}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "p") editor.chain().focus().setParagraph().run();
            if (value === "h1")
              editor.chain().focus().setHeading({ level: 1 }).run();
            if (value === "h2")
              editor.chain().focus().setHeading({ level: 2 }).run();
            if (value === "h3")
              editor.chain().focus().setHeading({ level: 3 }).run();
          }}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <Divider />

        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = prompt("Enter link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <Link2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <ImageIcon size={16} />
        </ToolbarButton>
      </div>

      {/* RIGHT */}
      <div className="flex gap-1">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </ToolbarButton>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 transition ${
        active ? "bg-blue-200 text-blue-700" : ""
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}
