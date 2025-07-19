import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CommunityDetailSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Community Header Card Skeleton */}
        <Card className="mb-8 overflow-hidden border-0 shadow-lg bg-white rounded-xl">
          <div className="relative">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              <div className="flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6">
                {/* Image Section Skeleton */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <Skeleton className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl" />
                </div>

                {/* Content Section Skeleton */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-3">
                    <div>
                      <Skeleton className="h-8 w-64 mb-2 mx-auto lg:mx-0" />
                      
                      {/* Meta Info Skeleton */}
                      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-3">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    
                    {/* Action Buttons Skeleton */}
                    <div className="flex gap-2 justify-center lg:justify-end">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>

                  {/* Description Section Skeleton */}
                  <div className="mb-4">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>

                  {/* Join Button Skeleton */}
                  <div className="flex justify-center lg:justify-start">
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
              
              {/* Bottom Border */}
              <Skeleton className="h-1 w-full" />
            </div>
          </div>
        </Card>

        {/* Navigation Tabs Skeleton */}
        <div className="mb-6">
          <div className="border-b border-gray-200 bg-white rounded-t-lg px-6">
            <div className="flex space-x-8 py-4">
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Posts Section - Takes 3 columns */}
          <div className="lg:col-span-3">
            {/* Create Post Button Skeleton */}
            <div className="mb-6">
              <Skeleton className="w-full h-12 rounded-lg" />
            </div>

            {/* Posts Skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="border-0 shadow-sm rounded-lg overflow-hidden bg-white">
                  <CardContent className="p-0">
                    {/* Post Header Skeleton */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-3/4" />
                    </div>

                    {/* Post Image Skeleton */}
                    <Skeleton className="h-64 w-full" />

                    {/* Post Content Skeleton */}
                    <div className="p-4">
                      <div className="space-y-2 mb-4">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-3/5" />
                      </div>

                      {/* Post Stats Skeleton */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <Skeleton className="h-8 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center gap-2 mt-6">
              <Skeleton className="h-10 w-24" />
              <div className="flex items-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-8" />
                ))}
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Sidebar Skeleton - Takes 1 column */}
          <div className="space-y-6">
            {/* About Section Skeleton */}
            <Card className="border-0 shadow-sm rounded-lg">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-8" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Members List Skeleton */}
            <Card className="border-0 shadow-sm rounded-lg">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-20" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-24 mb-1" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CommunityDetailSkeleton;