import SignUp from "@/components/auth/sign-up/signUp";
import GameLoader from "@/components/loader/loader";
import routeHOC from "@/routes/HOCs/routeHOC";
import { Suspense } from "react";

const SignUpPage = () => {
  return (
    <Suspense fallback={<GameLoader />}>
      <SignUp />
    </Suspense>
  );
}

const withHOC = routeHOC({
  title: "Memory Game | Sign-up",
});
export default withHOC(SignUpPage);