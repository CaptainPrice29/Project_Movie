
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Movies = lazy(() => import("../pages/movies"));
const NotFound = lazy(() => import("./notFound"));

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default AppRoutes
