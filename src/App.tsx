import './App.css'
import { ThemeProvider } from './context/theme-provider'
import Layout from './components/layout'
import { Dashboard } from './pages/dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WeatherProvider } from '@/context/weather-context'

// Configure QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Consider data fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      
      // Keep unused data in cache for 5 minutes
      gcTime: 5 * 60 * 1000,
      
      // Don't retry failed requests
      retry: false,
      
      // Don't refetch when window regains focus
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <WeatherProvider>
            <Layout>
              <Dashboard />
            </Layout>
        </WeatherProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
