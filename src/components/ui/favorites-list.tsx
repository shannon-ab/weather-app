import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavorites } from "@/context/favorites-context"
import { useWeather } from "@/context/weather-context"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GeocodingResponse } from '@/api/types'

function FavoriteItem({ city }: { city: GeocodingResponse }) {
  const { removeFavorite, isFavorite } = useFavorites()
  const { setSelectedLocation } = useWeather()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: `${city.lat}-${city.lon}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-4 bg-card rounded-lg border cursor-move"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-500 fill-current" />
        <span className="font-medium">{city.name}, {city.country}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedLocation(city);
          }}
        >
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            removeFavorite(city);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export function FavoritesList() {
  const { favorites, setFavorites } = useFavorites()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = favorites.findIndex(
        (item) => `${item.lat}-${item.lon}` === active.id
      )
      const newIndex = favorites.findIndex(
        (item) => `${item.lat}-${item.lon}` === over.id
      )
      setFavorites(arrayMove(favorites, oldIndex, newIndex))
    }
  }

  if (favorites.length === 0) {
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
            items={favorites.map(city => `${city.lat}-${city.lon}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {favorites.map((city) => (
                <FavoriteItem key={`${city.lat}-${city.lon}`} city={city} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  )
} 