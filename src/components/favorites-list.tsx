import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavorites } from "@/hooks/use-favorite"
import { useWeatherContext } from "@/context/weather-context"
import { Star, X } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FavoriteCity } from '@/api/types'
import { useWeatherQuery } from "@/hooks/use-weather"

function FavoriteItem({ city }: { city: FavoriteCity }) {
  const { temperatureUnit } = useWeatherContext()
  const { data: weather } = useWeatherQuery(city)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: city.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const unit = temperatureUnit === 'metric' ? '°C' : '°F'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-4 bg-card rounded-lg border group cursor-move"
    >
      <div className="flex items-center justify-between gap-4 flex-1">
        <div className="flex items-center gap-2 min-w-40">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="font-medium">{city.name}, {city.country}</span>
          {city.state && <span className="text-muted-foreground">({city.state})</span>}
        </div>
        
        {weather && (
          <div className="flex items-center justify-end gap-6 flex-1">
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="w-8 h-8"
              />
              <span className="font-medium">{Math.round(weather.main.temp)}{unit}</span>
            </div>
            <div className="flex gap-2 text-sm text-muted-foreground min-w-32 justify-end">
              <span>H: {Math.round(weather.main.temp_max)}{unit}</span>
              <span>L: {Math.round(weather.main.temp_min)}{unit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function FavoritesList() {
  const { favorites, reorderFavorites } = useFavorites()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = favorites.findIndex(
        (item: FavoriteCity) => item.id === active.id
      )
      const newIndex = favorites.findIndex(
        (item: FavoriteCity) => item.id === over.id
      )
      
      const newFavorites = arrayMove(favorites, oldIndex, newIndex)
      reorderFavorites.mutate(newFavorites)
    }
  }

  if (!favorites || favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Cities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No favorite cities yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Cities</CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={favorites.map((city: FavoriteCity) => city.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {favorites.map((city: FavoriteCity) => (
                <FavoriteItem key={city.id} city={city} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  )
} 