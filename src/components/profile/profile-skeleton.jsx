import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="relative">
        <Skeleton className="h-48 sm:h-56 md:h-64 rounded-2xl" />
        <div className="absolute -bottom-16 left-6 sm:left-8">
          <Skeleton className="w-[120px] h-[120px] rounded-full" />
        </div>
      </div>

      <div className="pt-16 pb-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-0 bg-white">
            <CardContent className="p-6 text-center">
              <Skeleton className="w-8 h-8 mx-auto mb-3 rounded-full" />
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 bg-white">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-gray-100 rounded-lg">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-32 w-full rounded-lg mb-3" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
