# Weather App

A modern weather application built with React that allows users to:
- Search for cities worldwide
- View current weather conditions and forecasts
- Save favorite cities with drag-and-drop reordering
- Toggle between Celsius and Fahrenheit
- See weather details including temperature, humidity, and conditions

## Prerequisites

Before running the application, make sure you have:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- An OpenWeatherMap API key (get one for free at [OpenWeatherMap](https://openweathermap.org/api))

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Features

- **City Search**: Search for any city worldwide
- **Current Weather**: View current temperature, conditions, and weather icon
- **Favorites**:
  - Save cities to your favorites list by clicking the star icon next to the city name
  - Drag and drop to reorder favorites
  - Quick view of weather for all favorite cities
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Responsive Design**: Switching between dark and light mode

## Technologies Used

- React
- TypeScript
- Vite
- TanStack Query (React Query)
- Tailwind CSS
- DND Kit (Drag and Drop)
- OpenWeatherMap API
