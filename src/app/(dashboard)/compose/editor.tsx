"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./toolbar";
import { useEffect } from "react";

type Props = {
  content?: string;
  onChange?: (html: string) => void;
  uploadFile?: (e: any) => void;
  resetEditor?: boolean;
  setResetEditor: (e: boolean) => void;
};

export default function TiptapEditor({
  content = "",
  onChange,
  uploadFile,
  resetEditor,
  setResetEditor,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        autolink: true,
        openOnClick: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
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

  useEffect(() => {
    if (resetEditor) {
      editor?.chain().clearContent().focus().run();
      setResetEditor(false);
    }
  }, [resetEditor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg h-[calc(100vh-32rem)] overflow-y-auto flex flex-col scroll-smooth">
      <Toolbar editor={editor} uploadFile={uploadFile} />
      <div className="flex-1 min-h-60 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="flex-1 overflow-y-auto prose max-w-none"
        />
      </div>
    </div>
  );
}
