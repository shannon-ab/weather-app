import React, { createContext, useContext, useState } from 'react'

interface Location {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

interface WeatherContextType {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <WeatherContext.Provider 
      value={{ 
        selectedLocation, 
        setSelectedLocation 
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
} 