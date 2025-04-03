import React from 'react'
import { CurrentWeather } from '@/components/ui/current-weather'

const Dashboard = () => {
  return (
    <div className="w-full space-y-4">
      <CurrentWeather />
    </div>
  )
}

export default Dashboard