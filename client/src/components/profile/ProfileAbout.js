import React, { Component } from "react";
import propTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.trim().split(" ")[0];
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="px-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {isEmpty(profile.bio) ? null : (
              <div>
                <h2 className="text-center text-info">About {firstName}</h2>
                <p className="lead">
                  {profile.bio}
                </p>
                <hr />
              </div>
            )}
            <h2 className="text-center text-info">Skill Set</h2>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

ProfileAbout.propTypes = {
  profile: propTypes.object.isRequired
};

export default ProfileAbout;