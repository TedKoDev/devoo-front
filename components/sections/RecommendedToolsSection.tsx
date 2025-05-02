import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { Tool } from "@/types/content";

interface RecommendedToolsSectionProps {
  data: Tool[];
}

export default function RecommendedToolsSection({ data }: RecommendedToolsSectionProps) {
  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">추천 툴 모음</h2>
        <Link href="/tools" className="text-sm text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {data?.map((tool) => (
          <Link href={`/tools/${tool.id}`} key={tool.id} className="block">
            <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md -mx-2">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                {tool.icon ? <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="w-6 h-6" /> : <div className="text-gray-400 text-xl">🛠️</div>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{tool.name}</h3>
                <p className="text-xs text-gray-500 truncate">{tool.description}</p>
              </div>
              <div className="flex items-center text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs ml-1">{tool.rating.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
