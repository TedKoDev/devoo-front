import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
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
import { ResizableImage } from "@/lib/extensions/ResizableImage";
import { useS3Upload } from "@/hooks/useS3Upload";
import MenuBar from "./MenuBar";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = "내용을 입력하세요...", editable = true, className = "" }: TiptapEditorProps) {
  const { uploadImage, isUploading } = useS3Upload({
    onSuccess: (url) => {
      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
  });

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
      ResizableImage.configure(),
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

  // 드래그 앤 드롭 이벤트 핸들러 추가
  useEffect(() => {
    if (!editor) return;

    const handleDrop = async (event: DragEvent) => {
      event.preventDefault();

      const files = event.dataTransfer?.files;
      if (!files?.length) return;

      const file = files[0];
      if (!file.type.startsWith("image/")) return;

      try {
        await uploadImage(file);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const element = editor.view.dom;
    element.addEventListener("drop", handleDrop);
    element.addEventListener("dragover", handleDragOver);

    return () => {
      element.removeEventListener("drop", handleDrop);
      element.removeEventListener("dragover", handleDragOver);
    };
  }, [editor, uploadImage]);

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
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white">이미지 업로드 중...</div>
        </div>
      )}
    </div>
  );
}
