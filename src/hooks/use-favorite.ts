import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { FavoriteCity } from "@/api/types";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity, 
  });

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
      };

      // Prevent duplicates
      const exists = favorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorites;

      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const reorderFavorites = useMutation({
    mutationFn: async (newOrder: FavoriteCity[]) => {
      setFavorites(newOrder);
      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites: favoritesQuery.data,
    addFavorite,
    removeFavorite,
    reorderFavorites,
    isFavorite: (lat: number, lon: number) =>
      favorites.some((city) => city.lat === lat && city.lon === lon),
  };
}