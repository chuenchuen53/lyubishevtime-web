import { lazy } from "solid-js";
import { Navigate, Router } from "@solidjs/router";
import { AppLayout } from "./layouts/AppLayout";

const routes = [
  {
    path: "/test-theme",
    component: lazy(() => import("./pages/TestTheme")),
  },
  {
    path: "/",
    component: lazy(() => import("./auth/AutoLoginRedirect")),
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
    component: lazy(() => import("./auth/LoginGuard")),
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
      {
        path: "/setting",
        component: lazy(() => import("./pages/Setting")),
      },
    ],
  },
  {
    path: "/*404",
    component: () => <Navigate href="/" />,
  },
];

export function AppRouter() {
  return <Router root={AppLayout}>{routes}</Router>;
}
