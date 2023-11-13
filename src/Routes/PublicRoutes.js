import React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function PublicRoutes() {
  const navigate = useNavigate();

  const auth = localStorage.getItem("currentuser");

  useEffect(() => {
    if (auth) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [auth, navigate]);
  return auth ? <Navigate to="/home" /> : <Outlet />;
}
