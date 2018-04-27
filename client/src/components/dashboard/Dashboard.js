import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  };

  onDeleteClick() {
    this.props.deleteAccount();
  }

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
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>!</p>
            <ProfileActions />
            <div className="mb-3">
              <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>
                Delete my Account
              </button>
            </div>
          </div>
        );
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
  deleteAccount: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);