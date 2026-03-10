"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./toolbar";

type Props = {
  content?: string;
  onChange?: (html: string) => void;
  uploadFile?: (e: any) => void;
};

export default function TiptapEditor({
  content = "",
  onChange,
  uploadFile,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: true,
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write your message here...",
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "tiptap-editor max-w-none h-full p-3 focus:outline-none [&_img]:max-w-full [&_img]:h-auto",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
      <Toolbar editor={editor} uploadFile={uploadFile} />
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
    </div>
  );
}
