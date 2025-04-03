import { useTheme } from '@/components/theme-provider'
import { Moon } from 'lucide-react';
import { Sun } from 'lucide-react';
import React from 'react'
import SearchCity from './ui/search-city';

const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';
  return (
    <div>
        <SearchCity />
        {/* location focus */}
        {/* degrees dropdown */}
        <div onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            {isDark ? <Sun /> : <Moon />}
        </div>
    </div>
  )
}

export default Header