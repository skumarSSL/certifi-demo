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

import AttachmentsSvg from "@public/assets/attachments.svg";
import { useRef, useState } from "react";

type Props = {
  editor: Editor | null;
  uploadFile?: (e: any) => void;
};

export default function Toolbar({ editor, uploadFile }: Props) {
  const [linkOpen, setLinkOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEditorState({
    editor,
    selector: ({ editor }) => ({
      isHeading1: editor?.isActive("heading", { level: 1 }),
      isHeading2: editor?.isActive("heading", { level: 2 }),
      isHeading3: editor?.isActive("heading", { level: 3 }),
      isParagraph: editor?.isActive("paragraph"),
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const src = reader.result as string;

      editor.chain().focus().setImage({ src }).run();
    };

    reader.readAsDataURL(file);
  };

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

        <ToolbarButton onClick={() => setLinkOpen(true)}>
          <Link2 size={16} />
        </ToolbarButton>

        {/* IMAGE UPLOAD BUTTON */}
        <ToolbarButton onClick={() => imageInputRef.current?.click()}>
          <ImageIcon size={16} />
        </ToolbarButton>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* ATTACHMENT */}
        <div className="relative col-span-2 group flex justify-end px-1">
          <label
            htmlFor="fileUpload"
            className="w-9 h-9 cursor-pointer flex items-center justify-center"
          >
            <img
              src={AttachmentsSvg.src}
              alt="attachments"
              className="w-5 h-5"
            />
          </label>

          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={uploadFile}
          />
        </div>
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

      <UrlModal
        open={linkOpen}
        title="Insert Link"
        onClose={() => setLinkOpen(false)}
        onSubmit={(url) => {
          if (!url) return;

          if (!url.startsWith("http")) {
            url = "https://" + url;
          }

          const { from, to } = editor.state.selection;

          if (from === to) {
            editor
              .chain()
              .focus()
              .insertContent(`<a href="${url}">${url}</a>`)
              .run();
          } else {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      />
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
        active ? "bg-blue-200 text-sky-700" : ""
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}

function UrlModal({
  open,
  title,
  onSubmit,
  onClose,
}: {
  open: boolean;
  title: string;
  onSubmit: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[350px]">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>

        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-3 py-1 rounded bg-[#EE9337] text-white"
            onClick={() => {
              onSubmit(url);
              setUrl("");
              onClose();
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}
