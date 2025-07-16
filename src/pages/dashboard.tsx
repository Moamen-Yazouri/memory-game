import MemoryGameDashboard from "@/components/dashboard/playerDashboard";
import routeHOC from "@/routes/HOCs/routeHOC";


const Dashboard = () => {
  return (
    <MemoryGameDashboard />
  )
}

const withHOC = routeHOC({
  title: "Memory Game | Player Dashboard",
});
export default withHOC(Dashboard);