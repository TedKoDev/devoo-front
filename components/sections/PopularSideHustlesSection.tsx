import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SideHustle } from "@/types/content";

interface PopularSideHustlesSectionProps {
  data: SideHustle[];
}

export default function PopularSideHustlesSection({ data }: PopularSideHustlesSectionProps) {
  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">인기 부업 정보</h2>
        <Link href="/side-hustles" className="text-sm text-primary flex items-center">
          더보기 <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {data?.map((hustle) => (
          <Link href={`/side-hustles/${hustle.id}`} key={hustle.id} className="block">
            <div className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-md -mx-2">
              {hustle.thumbnail && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded overflow-hidden">
                  <img src={hustle.thumbnail || "/placeholder.svg"} alt={hustle.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm line-clamp-2">{hustle.title}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{hustle.category}</span>
                  <span className="text-xs text-gray-500 ml-2">수익: {hustle.incomeRange}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{hustle.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
