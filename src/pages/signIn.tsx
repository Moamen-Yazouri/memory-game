import SignIn from "@/components/auth/sign-in/signIn";
import GameLoader from "@/components/loader/loader";
import routeHOC from "@/routes/HOCs/routeHOC";
import { Suspense } from "react";


const SignInPage = () => {
  
  return (
    <Suspense fallback={<GameLoader />}>
      <SignIn />
    </Suspense>
  );
}

const withHOC = routeHOC({
  title: "Memory Game | Sign-in",
});
export default withHOC(SignInPage);