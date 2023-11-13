import React from "react";
import {} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentuser");
    navigate("/");
  };
  return (
    <div>
      <nav>
        <div className="row">
          <div className="col">
            <button>
              <Link to="/modal" className="text-decoration-none text-start">
                Add Patient
              </Link>
            </button>
          </div>
          <div className="col">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* <LogOut user={user} setUser={setUser}/> */}
      </nav>
    </div>
  );
}
