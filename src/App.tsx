import { CompletedDB } from './@types';
import './App.css';
import { getFinsihedInfo } from './providers/player-info/utils/formatRealtimeDB';
import AppRoutes from './routes/AppRoutes';







function App() {
  return (
    <>
       <AppRoutes />  
    </>
  )
}

export default App
