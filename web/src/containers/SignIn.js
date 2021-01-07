import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import PropTypes from "prop-types";

const SignIn = ({ authLogin, isAuthenticated }) => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.push("/update-profile");
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    authLogin(formData);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const { username, password } = formData;

  return (
    <div className="mt-4">
      <h3 className="mb-3">Sign In</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username Or Email"
            value={username}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary form-control"
            value="Sign In"
          />
        </div>
        <Link to="/signup">Don't have an account?</Link>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  authLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  authLogin: (formData) => dispatch(actions.authLogin(formData)),
});

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProp, mapDispatchToProps)(SignIn);
