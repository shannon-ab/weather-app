import { useWeatherContext } from "@/context/weather-context"
import { CurrentWeather } from "@/components/current-weather"
import { HourlyTemp } from "@/components/hourly-temp"
import { DailyForecast } from "@/components/daily-forecast"
import { FavoritesList } from "@/components/favorites-list"
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather"
import { SkeletonWeatherCard, SkeletonHourlyCard, SkeletonDailyForecast } from "@/components/skeletons"

export function Dashboard() {
  const { selectedLocation } = useWeatherContext()
  const { data: weather, isLoading: isWeatherLoading } = useWeatherQuery(selectedLocation)
  const { data: forecast, isLoading: isForecastLoading } = useForecastQuery(selectedLocation)

  // Centralized loading state
  const isLoading = isWeatherLoading || isForecastLoading

  // Show skeleton UI when loading with a selected location
  if (isLoading && selectedLocation) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonWeatherCard />
          <SkeletonHourlyCard />
        </div>
        <SkeletonDailyForecast />
        <FavoritesList />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <CurrentWeather 
          weather={weather} 
          location={selectedLocation || undefined}
        />
        <HourlyTemp forecast={forecast} />
      </div>
      <DailyForecast forecast={forecast} />
      <FavoritesList />
    </div>
  )
}