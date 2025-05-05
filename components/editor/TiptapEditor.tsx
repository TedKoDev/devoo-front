import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { FontSize } from "@/lib/extensions/FontSize";
import MenuBar from "./MenuBar";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = "내용을 입력하세요...", editable = true, className = "" }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      FontSize.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      Underline.configure(),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      Highlight.configure(),
      CodeBlock.configure(),
      Blockquote.configure(),
      HorizontalRule.configure(),
      TaskList.configure(),
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: content || '<p style="font-size: 16px"><br></p>',
    editorProps: {
      attributes: {
        class: "prose-lg focus:outline-none",
        style: "font-size: 16px",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable,
  });

  // content가 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      console.log("TiptapEditor: Updating content to:", content);
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className={`border rounded-md bg-white flex-1 flex flex-col ${className}`}>
      {editable && <MenuBar editor={editor} />}
      <div className="p-4 flex-1 overflow-y-auto min-h-[300px] cursor-text">
        <EditorContent editor={editor} className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none w-full h-full focus:outline-none" />
      </div>
    </div>
  );
}
