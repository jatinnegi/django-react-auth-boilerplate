import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import PropTypes from "prop-types";

const SignUp = ({ isAuthenticated, authRegister }) => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    authRegister(formData);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const {
    username,
    email,
    password1,
    password2,
    first_name,
    last_name,
  } = formData;

  return (
    <div className="mt-4">
      <h3 className="mb-3">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="first_name"
            className="form-control"
            placeholder="First Name (Optional)"
            value={first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="last_name"
            className="form-control"
            placeholder="Last Name (Optional)"
            value={last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password1"
            className="form-control"
            placeholder="Password"
            value={password1}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            className="form-control"
            placeholder="Confirm Password"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary form-control"
            value="Sign Up"
          />
        </div>
        <Link to="/signin">Already have an account?</Link>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  authRegister: (formData) => dispatch(actions.authRegister(formData)),
});

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProp, mapDispatchToProps)(SignUp);
