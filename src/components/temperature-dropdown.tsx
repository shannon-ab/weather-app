import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useWeatherContext } from "@/context/weather-context"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const units = [
  { value: "metric", label: "Celsius (°C)" },
  { value: "imperial", label: "Fahrenheit (°F)" },
] as const

export function TemperatureDropdown() {
  const { temperatureUnit, setTemperatureUnit } = useWeatherContext();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[140px] justify-between"
        >
          {temperatureUnit === "metric" ? "Celsius" : "Fahrenheit"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandGroup>
            {units.map((unit) => (
              <CommandItem
                key={unit.value}
                value={unit.value}
                onSelect={() => {
                    setTemperatureUnit(unit.value);
                    setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    temperatureUnit === unit.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {unit.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 