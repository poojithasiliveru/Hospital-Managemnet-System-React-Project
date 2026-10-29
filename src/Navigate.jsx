
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navigate() {
  const userinfo = localStorage.getItem("user");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/signup");
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        <NavLink to="/patients" className="nav-link">
          Patients
        </NavLink>

        <NavLink to="/doctors" className="nav-link">
          Doctors
        </NavLink>

        {userinfo ? (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        ) : (
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navigate;
