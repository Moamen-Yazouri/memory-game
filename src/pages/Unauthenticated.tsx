import Unauthenticated from "@/components/unauthnticated/unauthenticated";
import routeHOC from "@/routes/HOCs/routeHOC";

const UnauthenticatedPage = () => {
  return (
    <Unauthenticated />
  )
}

const withHOC = routeHOC({
  title: "Memory Game | Login Required",
});
export default withHOC(UnauthenticatedPage);