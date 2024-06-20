import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedLogRoute = () => {
    const token = localStorage.getItem("adminToken");
    console.log(token, "token");
    if (token) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <Outlet />;
};

export default AdminProtectedLogRoute;
