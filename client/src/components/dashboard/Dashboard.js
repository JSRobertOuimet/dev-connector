import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if(profile === null || loading === true) {
      dashboardContent = <Spinner />;
    }
    else {
      if(Object.keys(profile).length === 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }!</p>
            <p>You have not yet created a profile.</p>
            <Link to="/create-profile" className="btn btn-info">Create</Link>
          </div>
        );
      }
      else {
        dashboardContent = "Profile here!";
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">
                {dashboardContent}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);