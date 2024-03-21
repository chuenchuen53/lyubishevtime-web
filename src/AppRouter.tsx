import { lazy } from "solid-js";
import { Router } from "@solidjs/router";
import { AppLayout } from "./Layouts/AppLayout";

const routes = [
  {
    path: "/test-theme",
    component: lazy(() => import("./pages/TestTheme")),
  },
  {
    path: "/",
    component: lazy(() => import("./components/common/AutoLoginRedirect")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./pages/index")),
      },
      {
        path: "/register",
        component: lazy(() => import("./pages/Register")),
      },
      {
        path: "/login",
        component: lazy(() => import("./pages/Login")),
      },
    ],
  },
  {
    path: "/",
    component: lazy(() => import("./components/common/LoginGuard")),
    children: [
      {
        path: "/tag",
        component: lazy(() => import("./pages/Tag")),
      },
      {
        path: "/event",
        component: lazy(() => import("./pages/Event")),
      },
      {
        path: "/summary",
        component: lazy(() => import("./pages/Summary")),
      },
    ],
  },
  {
    path: "/*404",
    component: lazy(() => import("./pages/NotFound")),
  },
];

export function AppRouter() {
  return <Router root={AppLayout}>{routes}</Router>;
}
