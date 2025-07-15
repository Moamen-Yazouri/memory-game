import AlreadyLoggedPage from "@/pages/alreadyLogged";
import SignUpPage from "@/pages/signUp";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const Landing = lazy(() => import("@/pages/landing"));
const SignInPage = lazy(() => import("@/pages/signIn"));
const UnauthenticatedPage = lazy(() => import("@/pages/Unauthenticated"));
const NotFoundPage = lazy(() => import("@/components/notFound/notFound"))

export const publicRoutes: RouteObject = {
    path: "",
      children: [
    {
      index: true,
      element: <Landing />,
    },
    {
      path: "sign-up",
      element: <SignUpPage />,
    },
    {
      path: "sign-in",
      element: <SignInPage />,
    },
    {
      path: "unauthenticated",
      element: <UnauthenticatedPage />,
    },
    {
      path: "already-logged",
      element: <AlreadyLoggedPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />
    },
  ],
}