import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoutes from "./PublicRoutes";
import Login from "../Pages/Login";
import Notfound from "../Pages/Notfound";
import Home from "../Pages/Home";
import Register from "../Pages/Registration";
import Modal from "../Components/Modal";
export default function MainRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/" element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/modal" element={<Modal />} />

          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}
