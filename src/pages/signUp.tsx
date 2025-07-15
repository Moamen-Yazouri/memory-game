import SignUp from "@/components/auth/sign-up/signUp";
import GameLoader from "@/components/loader/loader";
import { Suspense } from "react";

const SignUpPage = () => {
  return (
    <Suspense fallback={<GameLoader />}>
      <SignUp />
    </Suspense>
  );
}

export default SignUpPage;