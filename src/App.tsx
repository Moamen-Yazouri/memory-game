import './App.css';
import AlreadyAuthenticated from './components/already-logged/alreadyLogged';
import MemoryGameDashboard from './components/dashboard/playerDashboard';
import GameOverModal from './components/game-board/components/game-over/gameOver';
import SelectionRequired from './components/game-board/components/selectionRequired';
import LandingPage from './components/landing/landing';
import LevelCompleted from './components/level-completed/levelCompleted';
import GameLoader from './components/loader/loader';
import GameHeader from './components/main-header/mainHeader';
import MonsterLevelCard from './components/monster-card/monsterCard';
import SelectGame from './components/select-game/selectGame';
import SignInPage from './pages/signIn';
import AppRoutes from './routes/AppRoutes';








function App() {
    
  return (

    // <AlreadyAuthenticated />
    // <SelectGame />

    // <MemoryGameDashboard />
    // <SignInPage />
    <AppRoutes />
    // <MonsterLevelCard />
    // <LevelCompleted />
    // <GameLoader />
    // <GameHeader/>
    // <GameOverModal />
  )
}

export default App
