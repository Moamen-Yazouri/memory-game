import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeContextProvider from './providers/theme/themeContext.tsx'
import { GameProvider } from './providers/game-info/gameInfo.tsx'
import { AuthProvider } from './providers/auth/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>

      <ThemeContextProvider>

        <GameProvider>

          <App />
          
        </GameProvider>

      </ThemeContextProvider>

    </AuthProvider>

  </StrictMode>
)
