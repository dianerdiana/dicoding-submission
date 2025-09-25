// Router
import { createBrowserRouter, Navigate } from "react-router";

// Layout
import Layout from "../layout/Layout";

// Pages
import AppPage from "../pages/(private)/page";
import ArchivePage from "../pages/(private)/archives/page";
import NoteDetailPage from "../pages/(private)/notes/detail/page";
import CreateNotePage from "../pages/(private)/notes/create/page";
import NotFoundPage from "../pages/404";

// Public Pages
import LoginPage from "../pages/(public)/auth/login/page";
import RegisterPage from "../pages/(public)/auth/register/page";

// PrivateRoute
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { getHomeRouteForLoggedInUser } from "../utils";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={getHomeRouteForLoggedInUser()} replace />,
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
    ],
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, Component: AppPage },
          { path: "archives", Component: ArchivePage },
          { path: "notes/detail/:noteId", Component: NoteDetailPage },
          { path: "notes/create", Component: CreateNotePage },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
