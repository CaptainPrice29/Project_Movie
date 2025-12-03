import {
    createBrowserRouter,
} from "react-router-dom";
import AppRoutes from "./appRoutes";
export const router = createBrowserRouter([
    {
        path: "*",
        element: <AppRoutes />,
    },
]);