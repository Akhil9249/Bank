import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedLogRoute = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default UserProtectedLogRoute;
