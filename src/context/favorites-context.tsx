import React, { createContext, useContext, useState } from 'react'
import { GeocodingResponse } from '@/api/types'

interface FavoritesContextType {
  favorites: GeocodingResponse[];
  setFavorites: (favorites: GeocodingResponse[]) => void;
  addFavorite: (city: GeocodingResponse) => void;
  removeFavorite: (city: GeocodingResponse) => void;
  isFavorite: (city: GeocodingResponse) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<GeocodingResponse[]>([]);

  const addFavorite = (city: GeocodingResponse) => {
    setFavorites(prev => [...prev, city]);
  };

  const removeFavorite = (city: GeocodingResponse) => {
    setFavorites(prev => prev.filter(fav => 
      fav.lat !== city.lat || fav.lon !== city.lon
    ));
  };

  const isFavorite = (city: GeocodingResponse) => {
    return favorites.some(fav => 
      fav.lat === city.lat && fav.lon === city.lon
    );
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        setFavorites,
        addFavorite, 
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 