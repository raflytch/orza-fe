import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Skeleton className="h-4 w-32 bg-green-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <Card className="border border-green-200 bg-gradient-to-br from-white to-green-50/50">
            <div className="relative">
              <Skeleton className="h-32 w-full bg-green-200" />
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <Skeleton className="w-32 h-32 rounded-full bg-green-200" />
              </div>
            </div>

            <CardContent className="pt-20 pb-6 text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2 bg-green-200" />
              <div className="flex justify-center gap-2 mb-4">
                <Skeleton className="h-6 w-32 bg-green-200" />
                <Skeleton className="h-6 w-20 bg-green-200" />
              </div>
              <Skeleton className="h-4 w-48 mx-auto mb-6 bg-green-200" />
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <Skeleton className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-200" />
                  <Skeleton className="h-8 w-12 mx-auto mb-1 bg-green-200" />
                  <Skeleton className="h-4 w-20 mx-auto bg-green-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card className="border border-green-200 bg-white/90">
            <CardHeader>
              <Skeleton className="h-10 w-full bg-green-200" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 border border-green-100 rounded-xl bg-gradient-to-br from-white to-green-50/30"
                >
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-24 h-24 rounded-lg bg-green-200" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-full mb-2 bg-green-200" />
                      <Skeleton className="h-4 w-full mb-3 bg-green-200" />
                      <Skeleton className="h-3 w-32 bg-green-200" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
