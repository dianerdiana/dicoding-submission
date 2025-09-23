// Router
import { createBrowserRouter } from "react-router";

// Pages
import HomePage from "../pages/HomePage";
import ArchivePage from "../pages/archives/ArchivePage";
import NoteDetailPage from "../pages/notes/detail/NoteDetailPage";
import Layout from "../layout/Layout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, Component: HomePage },
      { path: "/archives", Component: ArchivePage },
      { path: "/notes/detail/:noteId", Component: NoteDetailPage },
    ],
  },
]);
