import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavorites } from "@/hooks/use-favorite"
import { Star } from "lucide-react"
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

function FavoriteItem({ city }: { city: FavoriteCity }) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center p-4 bg-card rounded-lg border cursor-move"
    >
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-yellow-500 fill-current" />
        <span className="font-medium">{city.name}, {city.country}</span>
        {city.state && <span className="text-muted-foreground">({city.state})</span>}
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