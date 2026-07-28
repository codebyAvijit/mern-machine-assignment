import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "../pages/Register/Register";
import UserListing from "../pages/UserListing/UserListing";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserListing />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
