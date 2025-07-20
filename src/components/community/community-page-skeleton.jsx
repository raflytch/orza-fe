import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export function CommunityPageSkeleton() {
  return (
    <main className="w-full min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative w-full h-screen flex flex-col">
        {/* Background Image Skeleton */}
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
          <Skeleton className="w-6 h-10 rounded-full" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header Section Skeleton */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 gap-6">
          <div>
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-12 w-48" />
        </div>

        {/* Communities Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              {/* Community Image Skeleton */}
              <div className="relative">
                <Skeleton className="w-full h-48" />

                {/* Member Count Badge Skeleton */}
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>

              <CardHeader className="p-6 pb-4">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>

              <CardContent className="pt-0 pb-4">
                {/* Description Skeleton */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Date Skeleton */}
                <Skeleton className="h-4 w-32" />
              </CardContent>

              <CardFooter className="flex gap-3 pt-3 border-t border-gray-100">
                <Skeleton className="h-9 flex-1 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <Skeleton className="h-10 w-24 rounded-full" />

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>

          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* Empty State Skeleton (alternative) */}
        <div className="hidden text-center py-20">
          <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-7 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-96 mx-auto mb-6" />
          <Skeleton className="h-10 w-48 mx-auto rounded-full" />
        </div>
      </div>
    </main>
  );
}

export default CommunityPageSkeleton;
