import { lazy } from "react";
import { profile } from "../../shared/constants/profile";
import routes from "../../shared/constants/route";
import type { PageConfig } from "./types";

export const pages: PageConfig[] = [
  {
    windowKey: "home",
    title: profile.name,
    icon: "🏠",
    route: routes.home,
    component: lazy(() => import("../pages/Home")),
  },
];