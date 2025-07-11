import { redirect, type RouteObject } from "react-router";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminOverview from "@/pages/AdminOverview";
import AdminLayout from "@/components/admin-layout";
import { getSession } from "@/lib/utils";
import AdminGenre from "@/pages/AdminGenre";
import AdminGenreForm from "@/pages/AdminGenre/form";
import AdminTheater from "@/pages/AdminTheater";
import AdminTheaterForm from "@/pages/AdminTheater/form";
import AdminMovie from "@/pages/AdminMovie";
import AdminMovieForm from "@/pages/AdminMovie/form";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: () => {
      const user = getSession();

      if (!user || user.role !== "admin") {
        throw redirect("/admin/login");
      }

      return user;
    },
    children: [
      {
        index: true,
        element: <AdminOverview />,
      },
      {
        path: "/admin/genres",
        // loader: async () => {
        //   const genres = await getGenres();

        //   return genres.data;
        // },
        element: <AdminGenre />,
      },
      {
        path: "/admin/genres/create",
        element: <AdminGenreForm />,
      },
      {
        path: "/admin/genres/edit/:id",
        element: <AdminGenreForm />,
      },
      {
        path: "/admin/theaters",
        element: <AdminTheater />,
      },
      {
        path: "/admin/theaters/create",
        element: <AdminTheaterForm />,
      },
      {
        path: "/admin/theaters/edit/:id",
        element: <AdminTheaterForm />,
      },
      {
        path: "/admin/movies",
        element: <AdminMovie />,
      },
      {
        path: "/admin/movies/create",
        element: <AdminMovieForm />,
      },
    ],
  },
];

export default adminRoutes;
