import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeContextProvider from './providers/theme/themeContext.tsx'
import { GameProvider } from './providers/game-info/gameInfo.tsx'
import { AuthProvider } from './providers/auth/authContext.tsx'
import ErrorBoundary from './components/error/error-boundary/errorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>

    
    <ErrorBoundary>

      <AuthProvider>

        

          <GameProvider>

            <App />
            
          </GameProvider>


      </AuthProvider>

    </ErrorBoundary>
    </ThemeContextProvider>

  </StrictMode>
)
