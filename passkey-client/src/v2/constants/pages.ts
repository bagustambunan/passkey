import { lazy } from "react";
import routes from "../../shared/constants/route";
import type { PageConfig } from "./types";

export const pages: PageConfig[] = [
  {
    windowKey: "login",
    title: "Login",
    icon: "🔒",
    route: routes.login,
    component: lazy(() => import("../pages/Login")),
  },
  {
    windowKey: "home",
    title: "Home",
    icon: "🏠",
    route: routes.home,
    component: lazy(() => import("../pages/Home")),
  },
];