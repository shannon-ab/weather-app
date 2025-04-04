import React, { createContext, useContext, useState } from 'react'

interface Location {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

type TemperatureUnit = 'metric' | 'imperial';

interface WeatherContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('metric');

  return (
    <WeatherContext.Provider 
      value={{ 
        selectedLocation, 
        setSelectedLocation,
        temperatureUnit,
        setTemperatureUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
} 