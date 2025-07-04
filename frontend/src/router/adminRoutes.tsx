import { type RouteObject } from "react-router";
import AdminLoginPage from "../pages/AdminLoginPage";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: "Admin Page",
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
];

export default adminRoutes;
