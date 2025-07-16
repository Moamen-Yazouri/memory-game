import LandingPage from "@/components/landing/landing";
import routeHOC from "@/routes/HOCs/routeHOC";

const Landing = () => {
  return (
    <LandingPage />
  )
}
const withHOC = routeHOC({
  title: "Memory Game",
});
export default withHOC(Landing);