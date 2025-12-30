import { lazy } from "react";
import routes from "../../shared/constants/route";
import type { PageConfig } from "./types";

export const pages: PageConfig[] = [
  {
    windowKey: "home",
    title: "Login",
    icon: "🔒",
    route: routes.home,
    component: lazy(() => import("../pages/Home")),
  },
];