import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function SkeletonWeatherCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div>
              <Skeleton className="w-20 h-8 mb-2" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
          <div className="text-right">
            <Skeleton className="w-28 h-4 mb-2" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonHourlyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex mb-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center min-w-[80px]">
                <Skeleton className="w-16 h-4 mb-2" />
                <Skeleton className="w-12 h-12 rounded-full mb-2" />
                <Skeleton className="w-10 h-4" />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export function SkeletonDailyForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-24">
                  <Skeleton className="w-16 h-4 mb-2" />
                  <Skeleton className="w-20 h-4" />
                </div>
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-4" />
                <Skeleton className="w-10 h-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 