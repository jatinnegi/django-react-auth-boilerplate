import React from "react";
import { connect } from "react-redux";
import { clearAlert } from "../store/actions/alerts";
import PropTypes from "prop-types";

const Alerts = ({ alerts, clearAlert }) => {
  return (
    <div className="alert-container">
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            className={`alert alert-${alert.type}`}
            role="alert"
            key={alert.id}
          >
            {alert.msg}
            <i
              className="alert-remove-cross fas fa-times"
              onClick={() => clearAlert(alert.id)}
            ></i>
          </div>
        ))}
    </div>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearAlert: (id) => dispatch(clearAlert(id)),
});

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
