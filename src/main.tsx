import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeContextProvider from './providers/theme/themeContext.tsx'
import { GameProvider } from './providers/game-info/gameInfo.tsx'
import { AuthProvider } from './providers/auth/authContext.tsx'
import ErrorBoundary from './components/error/error-boundary/errorBoundary.tsx'
import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>

      
      <ErrorBoundary>

        <AuthProvider>

          

            <GameProvider>

              <Toaster richColors position="bottom-right" />
              <App />
            </GameProvider>


        </AuthProvider>

      </ErrorBoundary>
      </ThemeContextProvider>
    </BrowserRouter>

  </StrictMode>
)
