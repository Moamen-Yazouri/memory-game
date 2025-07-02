import NotFoundPage from "@/components/notFound/notFound";
import Landing from "@/pages/landing";
import SignInPage from "@/pages/signIn";
import UnauthenticatedPage from "@/pages/Unauthenticated";
import { RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject = {
    path: "",
      children: [
    {
      index: true,
      element: <Landing />,
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
      path: "*",
      element: <NotFoundPage />
    },
  ],
}