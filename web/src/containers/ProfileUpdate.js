import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import PropTypes from "prop-types";

const ProfileUpdate = ({ user, updateUser }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
  });

  const [profileImage, setProfileImage] = useState({
    path: "",
    file: null,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ first_name, last_name, profile_image: profileImage.file });
  };

  const { first_name, last_name } = formData;

  return (
    <div className="mt-4">
      <h2>User Details</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              name="email"
              value={user.email}
              disabled
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="username"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control form-control-sm"
              id="username"
              name="username"
              value={user.username}
              disabled
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="first_name"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            First Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control form-control-sm"
              id="first_name"
              name="first_name"
              value={first_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="last_name"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control form-control-sm"
              id="last_name"
              name="last_name"
              value={last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="profile_image"
            className="col-sm-2 col-form-label col-form-label-sm"
          >
            Profile Photo
          </label>
          <div className="col-sm-10 form-group">
            <img
              src={profileImage.file ? profileImage.path : user.profile_image}
              alt=""
              style={{ width: "150px", height: "150px", cursor: "pointer" }}
              onClick={() =>
                document.getElementById("upload_profile_image").click()
              }
            />
          </div>
        </div>
        <input
          type="file"
          id="upload_profile_image"
          style={{ display: "none" }}
          onChange={(e) =>
            setProfileImage({
              path: URL.createObjectURL(e.target.files[0]),
              file: e.target.files[0],
            })
          }
        />
        <div className="form-group row mt-4">
          <div className="col-sm-12">
            <input
              type="submit"
              className="btn btn-primary float-right"
              value="Update Profile"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (formData) => dispatch(actions.updateUser(formData)),
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
