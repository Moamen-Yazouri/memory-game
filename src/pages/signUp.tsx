import SignUp from "@/components/auth/sign-up/signUp";
import { Suspense } from "react";

const SignUpPage = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <SignUp />
    </Suspense>
  );
}

export default SignUpPage;