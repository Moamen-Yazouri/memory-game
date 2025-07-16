import NotFound from "@/components/notFound/notFound"
import routeHOC from "@/routes/HOCs/routeHOC";

const NotFoundPage = () => {
  return (
    <NotFound />
  )
}

const withHOC = routeHOC({
  title: "Memory Game | Not Found",
});
export default withHOC(NotFoundPage);