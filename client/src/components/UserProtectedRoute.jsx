import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default UserProtectedRoute;
