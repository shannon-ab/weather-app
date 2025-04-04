import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeatherContext } from "@/context/weather-context"
import { useFavorites } from "@/hooks/use-favorite"
import { WeatherData, GeocodingResponse } from "@/api/types"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CurrentWeatherProps {
  weather: WeatherData | null | undefined;
  location?: GeocodingResponse;
}

export function CurrentWeather({ weather, location }: CurrentWeatherProps) {
  const { temperatureUnit } = useWeatherContext()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  if (!location) {
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

  if (!weather) {
    return null
  }

  const unit = temperatureUnit === 'metric' ? '°C' : '°F'
  const cityId = `${location.lat}-${location.lon}`
  const isCurrentCityFavorite = isFavorite(location.lat, location.lon)

  const handleFavoriteClick = () => {
    if (isCurrentCityFavorite) {
      removeFavorite.mutate(cityId)
    } else {
      addFavorite.mutate({
        name: location.name,
        lat: location.lat,
        lon: location.lon,
        country: location.country,
        state: location.state
      })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{location.name}, {location.country}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavoriteClick}
          className={isCurrentCityFavorite ? "text-yellow-500" : "text-muted-foreground"}
        >
          <Star className="h-5 w-5" fill={isCurrentCityFavorite ? "currentColor" : "none"} />
        </Button>
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