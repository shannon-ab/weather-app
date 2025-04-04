import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "@/api/weather";
import type { Coordinates } from "@/api/types";
import { useWeatherContext } from "@/context/weather-context";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates, unit: string) => ["weather", coords, unit] as const,
  forecast: (coords: Coordinates, unit: string) => ["forecast", coords, unit] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  const { temperatureUnit } = useWeatherContext();
  
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }, temperatureUnit),
    queryFn: () =>
      coordinates ? weatherApi.getCurrentWeather(coordinates, temperatureUnit) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  const { temperatureUnit } = useWeatherContext();

  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }, temperatureUnit),
    queryFn: () => (coordinates ? weatherApi.getForecast(coordinates, temperatureUnit) : null),
    enabled: !!coordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherApi.searchLocations(query),
    enabled: query.length >= 3,
  });
}