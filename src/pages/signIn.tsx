import SignIn from "@/components/auth/sign-in/signIn";
import GameLoader from "@/components/loader/loader";
import { Suspense } from "react";


const SignInPage = () => {
  
  return (
    <Suspense fallback={<GameLoader />}>
      <SignIn />
    </Suspense>
  );
}

export default SignInPage;