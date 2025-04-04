import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import React from 'react'
import { weatherApi } from '@/api/weather'
import { GeocodingResponse } from '@/api/types'
import { useLocationSearch } from "@/hooks/use-weather"
import { useWeatherContext } from '@/context/weather-context'

const SearchCity = () => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const { setSelectedLocation } = useWeatherContext()
  const { data: locations, isLoading } = useLocationSearch(query);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    setSelectedLocation({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      country
    });
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="w-[500px] justify-start text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search for a city...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
          className="h-11"
        />
        <CommandList>
          {query.length > 2 && !isLoading && locations?.length === 0 && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions" className="px-2">
              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handleSelect}
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-accent/50"
                >
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{location.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {location.state ? `${location.state}, ` : ''}{location.country}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchCity