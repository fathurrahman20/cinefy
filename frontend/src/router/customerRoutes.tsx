import { getSession } from "@/lib/utils";
import CustomerBrowseGenre from "@/pages/CustomerBrowse";
import CustomerHome from "@/pages/CustomerHome";
import CustomerLogin from "@/pages/CustomerLogin";
import CustomerMovieDetail from "@/pages/CustomerMovieDetail";
import CustomerOrderDetail from "@/pages/CustomerOrderDetail";
import CustomerOrders from "@/pages/CustomerOrders";
import CustomerRegister from "@/pages/CustomerRegister";
import CustomerTransaction from "@/pages/CustomerTransaction";
import CustomerTransactionSuccess from "@/pages/CustomerTransactionSuccess";
import CustomerWallet from "@/pages/CustomerWallet";
import CustomerWalletTopup from "@/pages/CustomerWalletTopup";
import CustomerWalletTopupSuccess from "@/pages/CustomerWalletTopupSuccess";
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
  {
    path: "/movie/:movieId",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      if (!params.movieId) {
        throw redirect("/");
      }

      return params.movieId;
    },
    element: <CustomerMovieDetail />,
  },
  {
    path: "/transaction-ticket",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      return true;
    },
    element: <CustomerTransaction />,
  },
  {
    path: "/transaction-ticket/success",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      return true;
    },
    element: <CustomerTransactionSuccess />,
  },
  {
    path: "/wallets",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      return true;
    },
    element: <CustomerWallet />,
  },
  {
    path: "/wallets/topup",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      return true;
    },
    element: <CustomerWalletTopup />,
  },
  {
    path: "/wallets/topup/success",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      return true;
    },
    element: <CustomerWalletTopupSuccess />,
  },
  {
    path: "/orders",
    loader: async () => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      return true;
    },
    element: <CustomerOrders />,
  },
  {
    path: "/orders/:orderId",
    loader: async ({ params }) => {
      const user = getSession();

      if (!user || user.role !== "customer") {
        throw redirect("/login");
      }

      if (!params.orderId) {
        throw redirect("/");
      }

      return params.orderId;
    },
    element: <CustomerOrderDetail />,
  },
];

export default customerRoutes;
