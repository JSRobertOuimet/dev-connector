import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreadFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      status: "",
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const statusOptions = [
      { label: "Select a status...", value: "" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Intern", value: "Intern" }
    ];

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            icon="fab fa-youtube"
            id="youtube"
            name="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            icon="fab fa-twitter"
            id="twitter"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            icon="fab fa-facebook"
            id="facebook"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            icon="fab fa-linkedin"
            id="linkedin"
            name="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            icon="fab fa-instagram"
            id="instagram"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your Profile</h1>
              <p className="lead text-center">Make your profile stand out!</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  id="handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                <SelectListGroup
                  options={statusOptions}
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="How would you define yourself?"
                />
                <TextFieldGroup
                  id="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Where do you work?"
                />
                <TextFieldGroup
                  id="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your website URL."
                />
                <TextFieldGroup
                  id="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City, State, Country."
                />
                <TextFieldGroup
                  id="skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Use comma-seperated values (e.g. HTML, CSS, JavaScript)."
                />
                <TextFieldGroup
                  id="githubUsername"
                  name="githubUsername"
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="If your want to display your latest repositories."
                />
                <TextAreadFieldGroup
                  id="bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us about yourself."
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Links
                  </button>
                  <span className="text-muted ml-2">(Optional)</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
