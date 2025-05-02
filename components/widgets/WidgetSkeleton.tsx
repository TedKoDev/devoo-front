import { Skeleton } from "@/components/ui/skeleton"

export default function WidgetSkeleton() {
  return (
    <div className="widget-card">
      <Skeleton className="h-4 w-24 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  )
}
