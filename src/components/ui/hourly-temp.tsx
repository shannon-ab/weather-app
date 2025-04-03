import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useWeather } from "@/context/weather-context"
import { ForecastData } from "@/api/types"

interface HourlyTempProps {
  forecast: ForecastData | null | undefined;
}

export function HourlyTemp({ forecast }: HourlyTempProps) {
  const { selectedLocation, temperatureUnit } = useWeather()

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Search for a city to see the forecast</p>
        </CardContent>
      </Card>
    )
  }

  if (!forecast) {
    return null
  }

  const unit = temperatureUnit === 'metric' ? '°C' : '°F'

  // Get next 24 hours of forecast
  const hourlyForecast = forecast.list.slice(0, 24)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex mb-6">
            {hourlyForecast.map((hour: ForecastData['list'][0]) => (
              <div key={hour.dt} className="flex flex-col items-center min-w-[80px]">
                <p className="text-sm text-muted-foreground">
                  {new Date(hour.dt * 1000).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  className="w-12 h-12"
                />
                <p className="font-medium">{Math.round(hour.main.temp)}{unit}</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}