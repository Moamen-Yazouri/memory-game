import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeContextProvider from './providers/theme/themeContext.tsx'
import { GameProvider } from './providers/game-info/gameInfo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
