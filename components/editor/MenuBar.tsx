import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Quote,
  Minus,
  CheckSquare,
  Highlighter,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useS3Upload } from "@/hooks/useS3Upload";

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  const { uploadImage, isUploading } = useS3Upload({
    onSuccess: (url) => {
      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("이미지 URL을 입력하세요");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("링크 URL을 입력하세요");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setFontSize = (size: string) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(size).run();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadImage(file);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <div className="border-b p-2 flex gap-2 flex-wrap">
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-muted" : ""}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "bg-muted" : ""}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "bg-muted" : ""}>
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive("highlight") ? "bg-muted" : ""}>
        <Highlighter className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-1 border rounded-md px-2">
        <Type className="h-4 w-4" />
        <select onChange={(e) => setFontSize(e.target.value)} className="bg-transparent text-sm focus:outline-none" value={editor?.getAttributes("textStyle").fontSize || "16px"}>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
        </select>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "bg-muted" : ""}>
        <List className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "bg-muted" : ""}>
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleTaskList().run()} className={editor.isActive("taskList") ? "bg-muted" : ""}>
        <CheckSquare className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "bg-muted" : ""}>
        <Code className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "bg-muted" : ""}>
        <Quote className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}>
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}>
        <AlignRight className="h-4 w-4" />
      </Button>
      <div className="relative">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
        <label htmlFor="image-upload" className="p-2 rounded cursor-pointer hover:bg-gray-100">
          <ImageIcon className="h-4 w-4" />
        </label>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={addLink} className={editor.isActive("link") ? "bg-muted" : ""}>
        <LinkIcon className="h-4 w-4" />
      </Button>
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white">이미지 업로드 중...</div>
        </div>
      )}
    </div>
  );
}
