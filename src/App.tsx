import { CompletedDB } from './@types';
import './App.css';
import { IPlayerInfoContext } from './providers/player-info/playerInfoContext';
import { getFinsihedInfo } from './providers/player-info/utils/formatRealtimeDB';


const dummy = {
  current: {
    modeName: "education",
    level: "medium"
  },
  finished: {
    education: {
      easy: {
        level: "easy",
        score: 80,
        time: 12,
        wrongMoves: 2
      },
      medium: {
        level: "medium",
        score: 95,
        time: 18,
        wrongMoves: 1
      }
    },
    states: {
      easy: {
        level: "easy",
        score: 70,
        time: 15,
        wrongMoves: 3
      }
    },
    emotional: {},
    events: {},
  },
  monster: {
    unlocked: false,
    score: 0,
    wrongMoves: 0,
    time: 0
  }
};

const finished: CompletedDB = dummy.finished as CompletedDB;
const map = getFinsihedInfo(finished);

console.log(map)






function App() {
  return (
    <>

       {/* <Timer /> */}
       {/* <SelectMode/> */}
       {/* <AppRoutes /> */}
        
    </>
  )
}

export default App
