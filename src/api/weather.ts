import { API_CONFIG } from "./config";
import { Coordinates, WeatherData, ForecastData, GeocodingResponse, TemperatureUnit } from "./types";

class WeatherApi {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    })
    return `${endpoint}?${searchParams.toString()}`
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
  }
  
  async getCurrentWeather({lat, lon}: Coordinates, unit: TemperatureUnit = 'metric'): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(), 
      lon: lon.toString(),
      units: unit
    });

    return this.fetchData<WeatherData>(url);
  }

  async getForecast({lat, lon}: Coordinates, unit: TemperatureUnit = 'metric'): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(), 
      lon: lon.toString(),
      units: unit,
      cnt: 40  // 5 days * 8 measurements per day
    });

    return this.fetchData<ForecastData>(url);
  }


  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEOCODING_URL}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}

export const weatherApi = new WeatherApi();