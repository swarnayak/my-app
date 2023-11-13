import { useEffect } from "react";
import Home from "../Pages/Home";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("currentuser");

  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [auth, navigate]);

  return <Home />;
};

export default ProtectedRoute;
