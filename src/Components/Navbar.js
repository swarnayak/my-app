import React from "react";
import {} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentuser");
    navigate("/");
  };
  const handleCreate = () => {
    navigate("/create-pateient");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="">
          <Link className="navbar-brand " to="/home">
            <img src="./logo512.png" width={35} alt="" />
            <span className="text-light ms-3 mt-2">ShareMe Go</span>
          </Link>
          {/* <p className="text-light col-2">ShareMe Go</p> */}
        </div>
        <div>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav me-auto mb-2 ms-3  mb-lg-0">
            <div className="nav-item m-1 ">
              <Link
                className=" btn btn-outline-dark btn-sm btn-light"
                aria-current="page"
                to="/patient-info"
              >
                List of patient
              </Link>
            </div>

            <div className="nav-item m-1">
              <button
                className="btn btn-outline-dark btn-sm btn-light"
                onClick={handleCreate}
              >
                Add patient
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
