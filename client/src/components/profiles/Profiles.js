import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Spinner from "../common/Spinner";
import SingleProfile from "./SingleProfile";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let allProfiles;

    if(profiles === null || loading) {
      allProfiles = <Spinner />;
    }
    else {
      if(profiles.length > 0) {
        allProfiles = profiles.map(profile => (
          <SingleProfile
            key={profile._id}
            profile={profile}
          />
        ));
      }
      else {
        allProfiles = <h2>No profiles found.</h2>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Profiles</h1>
            <p className="lead text-center">Browse and connect with developers!</p>
            { allProfiles }
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