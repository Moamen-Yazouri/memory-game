import './App.css';
import AlreadyAuthenticated from './components/already-logged/alreadyLogged';
import MemoryGameDashboard from './components/dashboard/playerDashboard';
import GameOverModal from './components/game-board/components/game-over/gameOver';
import SelectionRequired from './components/game-board/components/selectionRequired';
import LandingPage from './components/landing/landing';
import LevelCompleted from './components/level-completed/levelCompleted';
import GameHeader from './components/main-header/mainHeader';
import SelectGame from './components/select-game/selectGame';
import SignInPage from './pages/signIn';
import AppRoutes from './routes/AppRoutes';








function App() {
    
  return (

    // <AlreadyAuthenticated />
    // <SelectGame />

    // <MemoryGameDashboard />
    // <SignInPage />
    
    // <LevelCompleted />
    <AppRoutes />
    // <GameHeader/>
    // <GameOverModal />
  )
}

export default App
