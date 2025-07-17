import CustomerHome from "@/pages/CustomerHome";
import CustomerLogin from "@/pages/CustomerLogin";
import CustomerRegister from "@/pages/CustomerRegister";
import type { RouteObject } from "react-router";

const customerRoutes: RouteObject[] = [
  {
    path: "/register",
    element: <CustomerRegister />,
  },
  {
    path: "/login",
    element: <CustomerLogin />,
  },
  {
    path: "/",
    element: <CustomerHome />,
  },
];

export default customerRoutes;
