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
];

export default customerRoutes;
