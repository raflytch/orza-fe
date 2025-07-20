import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function MyCommunityPageSkeleton() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative w-full h-screen flex flex-col">
        {/* Background Skeleton */}
        <Skeleton className="absolute inset-0 w-full h-full" />

        {/* Content Skeleton */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
          <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 max-w-4xl mb-4" />
          <Skeleton className="h-6 md:h-8 w-2/3 max-w-2xl mb-8" />

          {/* Search Bar Skeleton */}
          <div className="relative max-w-md w-full mx-auto">
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>

        {/* Scroll Indicator Skeleton */}
        <div className="relative z-10 pb-8 flex justify-center">
          <Skeleton className="w-8 h-8" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Stats Summary Skeleton */}
        <div className="mb-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Header with Create Button Skeleton */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Communities Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-white border-0 shadow-sm rounded-xl"
            >
              {/* Community Image Skeleton */}
              <div className="relative">
                <Skeleton className="w-full h-48" />
                {/* Owner Badge Skeleton */}
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>

              <CardHeader className="p-5 pb-3">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>

              <CardContent className="p-5 pt-0">
                {/* Description Skeleton */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Date Skeleton */}
                <Skeleton className="h-4 w-32 mb-5" />

                {/* Stats Skeleton */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Skeleton (alternative) */}
        <div className="hidden text-center py-20">
          <Skeleton className="w-20 h-20 mx-auto mb-6 rounded-full" />
          <Skeleton className="h-8 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-96 mx-auto mb-6" />
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </main>
  );
}

export default MyCommunityPageSkeleton;
