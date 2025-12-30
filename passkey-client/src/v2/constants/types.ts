import type { ComponentType, LazyExoticComponent } from "react";

export type PageConfig = {
  windowKey: string;
  title: string;
  icon: string;
  route: string;
  component: LazyExoticComponent<ComponentType>;
}