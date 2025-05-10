import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

export const ResizableImageComponent = ({ node, updateAttributes }: NodeViewProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.pageX);
    setStartWidth(imageRef.current?.width || 0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const width = startWidth + (e.pageX - startX);
    if (width > 50) {
      // 최소 너비 제한
      updateAttributes({
        width: width,
      });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <NodeViewWrapper>
      <div className="relative inline-block">
        <img ref={imageRef} src={node.attrs.src} alt={node.attrs.alt} width={node.attrs.width} height={node.attrs.height} className="max-w-full" />
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 rounded-sm" onMouseDown={handleMouseDown} />
      </div>
    </NodeViewWrapper>
  );
};
