import AlreadyAuthenticated from "@/components/already-logged/alreadyLogged"
import routeHOC from "@/routes/HOCs/routeHOC";

const AlreadyLoggedPage = () => {
  return (
    <AlreadyAuthenticated />
  )
}
const withHOC = routeHOC({
  title: "Memory Game | Already Authenticated",
});
export default withHOC(AlreadyLoggedPage);