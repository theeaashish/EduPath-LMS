import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton() {
  return (
    <div className="flex flex-col h-full bg-background pl-6 space-y-4">
      {/* Video placeholder */}
      <Skeleton className="w-full rounded-lg aspect-video" />
      {/* Button placeholder */}
      <Skeleton className="w-32 h-10" />
      {/* Title & description placeholders */}
      <div className="space-y-3 pt-3 w-full">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
