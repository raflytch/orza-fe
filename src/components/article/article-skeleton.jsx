import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ArticleSkeleton() {
  return (
    <Card className="group overflow-hidden bg-white border-0 shadow-sm rounded-xl">
      <Skeleton className="aspect-video w-full" />

      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-20 mb-2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ArticleSkeletonList({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}
