import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Register from "../pages/Register/Register";
import UserListing from "../pages/UserListing/UserListing";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/register" replace />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/users"
                    element={<UserListing />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;