import { useTheme } from '@/components/theme-provider'
import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import SearchCity from './ui/search-city';
import { useWeather } from '@/context/weather-context';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { useState } from "react"

const units = [
  { value: "metric", label: "Celsius (°C)" },
  { value: "imperial", label: "Fahrenheit (°F)" },
]

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { temperatureUnit, setTemperatureUnit } = useWeather();
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <SearchCity />
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[140px] justify-between"
              onClick={() => setOpen(!open)}
            >
              {temperatureUnit === "metric" ? "Celsius" : "Fahrenheit"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            {open && (
              <div className="absolute top-full left-0 mt-1 w-[140px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in z-50">
                <Command>
                  <CommandGroup>
                    {units.map((unit) => (
                      <CommandItem
                        key={unit.value}
                        value={unit.value}
                        onSelect={() => {
                          setTemperatureUnit(unit.value as "metric" | "imperial")
                          setOpen(false)
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
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header