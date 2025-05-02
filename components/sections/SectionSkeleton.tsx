import { Skeleton } from "@/components/ui/skeleton"

export default function SectionSkeleton() {
  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Skeleton className="h-16 w-16 rounded" />
          <div className="flex-1">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Skeleton className="h-16 w-16 rounded" />
          <div className="flex-1">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Skeleton className="h-16 w-16 rounded" />
          <div className="flex-1">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
