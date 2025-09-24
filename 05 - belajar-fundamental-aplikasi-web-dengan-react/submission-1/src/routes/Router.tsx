// Router
import { createBrowserRouter } from "react-router";

// Layout
import Layout from "../layout/Layout";

// Pages
import HomePage from "../pages/HomePage";
import ArchivePage from "../pages/archives/ArchivePage";
import NoteDetailPage from "../pages/notes/detail/NoteDetailPage";
import CreateNotePage from "../pages/notes/create/NoteCreatePage";
import NotFoundPage from "../pages/404";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, Component: HomePage },
      { path: "/archives", Component: ArchivePage },
      { path: "/notes/detail/:noteId", Component: NoteDetailPage },
      { path: "/notes/create", Component: CreateNotePage },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
