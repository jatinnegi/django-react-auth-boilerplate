import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authLogout } from "../store/actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.href.split("/").pop());
  }, []);

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li
        className={`nav-item ${currentPath === "signin" ? "active" : ""}`}
        onClick={() => setCurrentPath("signin")}
      >
        <Link className="nav-link" to="/signin">
          Sign In
        </Link>
      </li>
      <li
        className={`nav-item ${currentPath === "signup" ? "active" : ""}`}
        onClick={() => setCurrentPath("signup")}
      >
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ml-auto d-flex align-items-center">
      <li className="nav-item mr-4">
        <span style={{ color: "white", cursor: "pointer" }}>
          {user ? (
            <Link to="/update-profile" className="nav-link">
              <img
                src={user.profile_image}
                alt=""
                style={{
                  height: "25px",
                  width: "25px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              {user.username}
            </Link>
          ) : (
            ""
          )}
        </span>
      </li>
      <li className="nav-item">
        <button className="btn btn-danger btn-sm" onClick={() => logout()}>
          Sign Out
        </button>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authLogout()),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
