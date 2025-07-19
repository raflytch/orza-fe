import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CommunityPostSkeleton() {
  return (
    <main className="container mx-auto px-4 py-30 max-w-4xl">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Post Content Card Skeleton */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Post Title Skeleton */}
              <Skeleton className="h-8 w-3/4 mb-4" />
              
              {/* Author Info Skeleton */}
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>

              {/* Meta Info Skeleton */}
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Post Actions Skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Post Image Skeleton */}
          <div className="mb-6">
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>

          {/* Post Content Skeleton */}
          <div className="mb-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Comments Section Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          {/* Comment Form Skeleton */}
          <div className="mb-6">
            <div className="flex gap-3">
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="w-full h-20 rounded-lg" />
                <div className="flex justify-end mt-2">
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Comments List Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex gap-3">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="space-y-2 mb-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-8" />
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