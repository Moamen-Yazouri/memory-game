import SignIn from "@/components/auth/sign-in/signIn";
import { Suspense } from "react";


const SignInPage = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}

export default SignInPage;