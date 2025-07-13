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
import { PlayerInfoProvider } from './providers/player-info/playerInfoContext.tsx'
import HeaderWrapper from './components/header-wrapper/headerWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeContextProvider>

        
          <AuthProvider>

              <PlayerInfoProvider>
                  <GameProvider>
                    <Toaster richColors position="bottom-right" />
                    <HeaderWrapper>
                      <App />
                    </HeaderWrapper>
                  </GameProvider>
              </PlayerInfoProvider>


          </AuthProvider>

        </ThemeContextProvider>
      </BrowserRouter>
    </ErrorBoundary>

  </StrictMode>
)
