import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Layout from './components/layout'
import { Dashboard } from './pages/dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WeatherProvider } from '@/context/weather-context'
import { FavoritesProvider } from '@/context/favorites-context'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <WeatherProvider>
          <FavoritesProvider>
            <Layout>
              <Dashboard />
            </Layout>
          </FavoritesProvider>
        </WeatherProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
