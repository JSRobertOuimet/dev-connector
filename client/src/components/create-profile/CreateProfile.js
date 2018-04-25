import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreadFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      bio: "",
      githubUsername: "",
      displaySocialInputs: false,
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Profile
              </h1>
              <p className="lead text-center">
                Make your profile stand out.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

CreateProfile.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);