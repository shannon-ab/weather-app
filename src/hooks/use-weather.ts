import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "@/api/weather";
import type { Coordinates, GeocodingResponse } from "@/api/types";
import { useWeather } from "@/context/weather-context";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(location: GeocodingResponse | null) {
  const { temperatureUnit } = useWeather();
  
  console.log('Weather Query - Current Unit:', temperatureUnit);
  
  return useQuery({
    queryKey: ['weather', location, temperatureUnit],
    queryFn: () => location ? weatherApi.getCurrentWeather(location, temperatureUnit) : null,
    enabled: !!location
  });
}

export function useForecastQuery(location: GeocodingResponse | null) {
  const { temperatureUnit } = useWeather();
  
  console.log('Forecast Query - Current Unit:', temperatureUnit);
  
  return useQuery({
    queryKey: ['forecast', location, temperatureUnit],
    queryFn: () => location ? weatherApi.getForecast(location, temperatureUnit) : null,
    enabled: !!location
  });
}

export function useReverseGeocodeQuery(location: GeocodingResponse | null) {
  return useQuery({
    queryKey: ['geocode', location],
    queryFn: () => location ? weatherApi.geoCode(location) : null,
    enabled: !!location
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ['locationSearch', query],
    queryFn: () => weatherApi.searchLocations(query),
    enabled: query.length > 0
  });
}