import { useState } from "react"
import { useWeather } from "@/context/weather-context"
import SearchCity from "@/components/ui/search-city"
import { CurrentWeather } from "@/components/ui/current-weather"
import { HourlyTemp } from "@/components/ui/hourly-temp"
import { DailyForecast } from "@/components/ui/daily-forecast"
import { GeocodingResponse } from "@/api/types"
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather"

export function Dashboard() {
  const { selectedLocation, setSelectedLocation } = useWeather()
  const { data: weather, isLoading: isWeatherLoading } = useWeatherQuery(selectedLocation)
  const { data: forecast, isLoading: isForecastLoading } = useForecastQuery(selectedLocation)

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <CurrentWeather weather={weather} isLoading={isWeatherLoading} />
        <HourlyTemp forecast={forecast} />
      </div>
      <DailyForecast forecast={forecast} />
    </div>
  )
}