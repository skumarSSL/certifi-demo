"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./toolbar"
import { extensions } from "./extensions";

type Props = {
  content?: string;
  onChange?: (html: string) => void;
};

export default function TiptapEditor({ content = "", onChange }: Props) {
  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[200px] p-3 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
