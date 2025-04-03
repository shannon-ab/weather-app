import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeather } from "@/context/weather-context"
import { WeatherData } from "@/api/types"

interface CurrentWeatherProps {
  weather: WeatherData | null | undefined;
  isLoading: boolean;
}

export function CurrentWeather({ weather, isLoading }: CurrentWeatherProps) {
  const { selectedLocation, temperatureUnit } = useWeather()

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Search for a city to see the weather</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading weather data...</p>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return null
  }

  const unit = temperatureUnit === 'metric' ? '°C' : '°F'

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedLocation.name}, {selectedLocation.country}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24"
            />
            <div>
              <p className="text-4xl font-bold">{Math.round(weather.main.temp)}{unit}</p>
              <p className="text-muted-foreground capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Feels like: {Math.round(weather.main.feels_like)}{unit}</p>
            <p className="text-sm text-muted-foreground">Humidity: {weather.main.humidity}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 