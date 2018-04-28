import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if(profiles === null || loading) {
      profileItems = <Spinner />;
    }
    else {
      if(profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem
            key={profile._id}
            profile={profile}
          />
        ));
      }
      else {
        profileItems = <h2>No profiles found.</h2>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developers Profile</h1>
            <p className="lead text-center">Browse and connect with developers!</p>
            { profileItems }
          </div>
        </div>
      </div>
    );
  };
}

Profiles.propTypes = {
  getProfiles: propTypes.func.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);