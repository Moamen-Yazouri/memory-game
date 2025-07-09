import './App.css';
import AlreadyAuthenticated from './components/already-logged/alreadyLogged';
import MemoryGameDashboard from './components/dashboard/playerDashboard';
import SelectionRequired from './components/game-board/components/selectionRequired';
import LandingPage from './components/landing/landing';
import LevelCompleted from './components/level-completed/levelCompleted';
import SelectGame from './components/select-game/selectGame';
import SignInPage from './pages/signIn';
import AppRoutes from './routes/AppRoutes';








function App() {
    
  return (

    // <AlreadyAuthenticated />
    // <SelectGame />

    // <MemoryGameDashboard />
    // <SignInPage />
    
    <LevelCompleted />
  )
}

export default App
