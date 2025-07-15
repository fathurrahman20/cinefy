import { createBrowserRouter } from "react-router";
import adminRoutes from "./adminRoutes";
import customerRoutes from "./customerRoutes";

const router = createBrowserRouter([...adminRoutes, ...customerRoutes]);

export default router;
