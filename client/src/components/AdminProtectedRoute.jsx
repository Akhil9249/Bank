import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
    const token = localStorage.getItem("adminToken");
    console.log(token, "token");
    if (!token) {
        return <Navigate to="/admin" />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;
