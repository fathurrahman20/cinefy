import { redirect, type RouteObject } from "react-router";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminOverview from "@/pages/AdminOverview";
import AdminLayout from "@/components/admin-layout";
import { getSession } from "@/lib/utils";
import AdminGenre from "@/pages/AdminGenre";

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
    ],
  },
];

export default adminRoutes;
