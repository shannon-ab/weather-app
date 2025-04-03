import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeather } from "@/context/weather-context"
import { useEffect, useState } from "react"
import { weatherApi } from "@/api/weather"
import { WeatherData } from "@/api/types"

export function CurrentWeather() {
  const { selectedLocation } = useWeather()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      if (!selectedLocation) return

      setLoading(true)
      setError(null)
      try {
        const data = await weatherApi.getCurrentWeather(selectedLocation)
        setWeather(data)
      } catch (err) {
        setError('Failed to fetch weather data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [selectedLocation])

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

  if (loading) {
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

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return null
  }

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
              <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-muted-foreground capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Feels like: {Math.round(weather.main.feels_like)}°C</p>
            <p className="text-sm text-muted-foreground">Humidity: {weather.main.humidity}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 