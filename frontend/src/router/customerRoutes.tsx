import CustomerRegister from "@/pages/CustomerRegister";
import type { RouteObject } from "react-router";

const customerRoutes: RouteObject[] = [
  {
    path: "/register",
    element: <CustomerRegister />,
  },
];

export default customerRoutes;
