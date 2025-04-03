import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/layout'
import { ThemeProvider } from './components/theme-provider'
import Dashboard from './pages/dashboard'
import City from './pages/city'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/city/:cityName" element={<City />} />
            </Routes>
          </Layout>
        </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
