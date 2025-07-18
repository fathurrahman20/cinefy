import { getSession } from "@/lib/utils";
import CustomerBrowseGenre from "@/pages/CustomerBrowse";
import CustomerHome from "@/pages/CustomerHome";
import CustomerLogin from "@/pages/CustomerLogin";
import CustomerRegister from "@/pages/CustomerRegister";
import { redirect, type RouteObject } from "react-router";

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
  {
    path: "/browse/:genreId",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      if (!params.genreId) {
        throw redirect("/");
      }
    },
    element: <CustomerBrowseGenre />,
  },
];

export default customerRoutes;
