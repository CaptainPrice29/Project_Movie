import {
    createBrowserRouter,
} from "react-router-dom";
import Movies from "../pages/movies";
export const router = createBrowserRouter([
    {
        path: "/movies",
        element: <Movies />,
    },
]);