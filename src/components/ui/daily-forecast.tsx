import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeather } from "@/context/weather-context"
import { ForecastData } from "@/api/types"

interface DailyForecastProps {
  forecast: ForecastData | null | undefined;
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const { selectedLocation, temperatureUnit } = useWeather()

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
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

  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce((acc: { [key: string]: typeof forecast.list }, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})

  // Get the next 5 days
  const next5Days = Object.entries(dailyForecasts).slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {next5Days.map(([date, dayData]) => {
            const maxTemp = Math.max(...dayData.map(d => d.main.temp))
            const minTemp = Math.min(...dayData.map(d => d.main.temp))
            const mostFrequentWeather = dayData.reduce((acc, curr) => {
              acc[curr.weather[0].icon] = (acc[curr.weather[0].icon] || 0) + 1
              return acc
            }, {} as { [key: string]: number })

            const weatherIcon = Object.entries(mostFrequentWeather).sort((a, b) => b[1] - a[1])[0][0]
            const dateObj = new Date(date)

            return (
              <div key={date} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <p className="font-medium">
                      {dateObj.toLocaleDateString([], { weekday: 'short' })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
                    alt={dayData[0].weather[0].description}
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">{Math.round(maxTemp)}{unit}</p>
                  <p className="text-muted-foreground">{Math.round(minTemp)}{unit}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 