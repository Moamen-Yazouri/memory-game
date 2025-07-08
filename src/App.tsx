import './App.css';
import AlreadyAuthenticated from './components/already-logged/alreadyLogged';
import MemoryGameDashboard from './components/dashboard/playerDashboard';
import LandingPage from './components/landing/landing';
import SelectGame from './components/select-game/selectGame';
import AppRoutes from './routes/AppRoutes';








function App() {
    
  return (
    // <AlreadyAuthenticated />
    <SelectGame />
    // <MemoryGameDashboard />  
  )
}

export default App
