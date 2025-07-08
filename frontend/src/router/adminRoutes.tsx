import { type RouteObject } from "react-router";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminOverview from "@/pages/AdminOverview";
import AdminLayout from "@/components/admin-layout";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminOverview />,
      },
    ],
  },
];

export default adminRoutes;
