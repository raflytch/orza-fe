import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CommunityPostSkeleton() {
  return (
    <main className="container mx-auto px-4 py-30 max-w-4xl">
      {/* Back Button Skeleton */}
      <div className="mb-4 sm:mb-6">
        <Skeleton className="h-8 w-24 sm:h-10 sm:w-40" />
      </div>

      {/* Post Content Card Skeleton */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Post Title Skeleton */}
              <Skeleton className="h-6 w-full sm:h-8 sm:w-3/4 mb-3 sm:mb-4" />
              
              {/* Author Info Skeleton */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" />
                <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                  <Skeleton className="h-3 w-24 sm:h-4 sm:w-32" />
                  <Skeleton className="h-2 w-28 sm:h-3 sm:w-40" />
                </div>
              </div>

              {/* Meta Info Skeleton */}
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                <Skeleton className="h-3 w-16 sm:h-4 sm:w-24" />
                <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
                <Skeleton className="h-3 w-14 sm:h-4 sm:w-20" />
              </div>
            </div>

            {/* Post Actions Skeleton - Hidden on mobile */}
            <div className="hidden sm:flex gap-2 flex-shrink-0">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>

            {/* Mobile Actions - Three dots menu */}
            <div className="sm:hidden flex-shrink-0">
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Post Image Skeleton */}
          <div className="mb-4 sm:mb-6">
            <Skeleton className="w-full h-48 sm:h-64 md:h-96 rounded-lg" />
          </div>

          {/* Post Content Skeleton */}
          <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
            <Skeleton className="h-3 w-full sm:h-4" />
            <Skeleton className="h-3 w-full sm:h-4" />
            <Skeleton className="h-3 w-4/5 sm:h-4 sm:w-3/4" />
            <Skeleton className="h-3 w-full sm:h-4" />
            <Skeleton className="h-3 w-3/4 sm:h-4 sm:w-5/6" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
            <Skeleton className="h-8 w-16 sm:h-10 sm:w-24" />
            <Skeleton className="h-8 w-20 sm:h-10 sm:w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Comments Section Skeleton */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <Skeleton className="h-5 w-24 sm:h-6 sm:w-32" />
        </CardHeader>
        <CardContent>
          {/* Comment Form Skeleton */}
          <div className="mb-4 sm:mb-6">
            <div className="flex gap-2 sm:gap-3">
              <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0 mt-1" />
              <div className="flex-1">
                <Skeleton className="w-full h-16 sm:h-20 rounded-lg" />
                <div className="flex justify-end mt-2">
                  <Skeleton className="h-8 w-20 sm:h-10 sm:w-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Comments List Skeleton */}
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 sm:pb-4 last:border-b-0">
                <div className="flex gap-2 sm:gap-3">
                  <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
                      <Skeleton className="h-2 w-12 sm:h-3 sm:w-16" />
                    </div>
                    <div className="space-y-1 sm:space-y-2 mb-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5 sm:w-3/4" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-3 w-6 sm:h-4 sm:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>
    </main>
  );
}

export default CommunityPostSkeleton;