import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react';
import SearchCity from './search-city';
import { Button } from "@/components/ui/button"
import { TemperatureDropdown } from './temperature-dropdown'

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-9 h-16 flex items-center justify-between">
        <SearchCity />
        <div className="flex items-center gap-4">
          <TemperatureDropdown />
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