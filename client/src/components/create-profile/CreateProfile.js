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
    if(nextProps.errors) {
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
      instagram: this.state.instagram,
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

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            icon="fab fa-youtube"
            name="youtube"
            value={this.state.youtube}
            placeholder="Youtube"
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            icon="fab fa-twitter"
            name="twitter"
            value={this.state.twitter}
            placeholder="Twitter"
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            icon="fab fa-facebook"
            name="facebook"
            value={this.state.facebook}
            placeholder="Facebook"
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            icon="fab fa-linkedin"
            name="linkedin"
            value={this.state.linkedin}
            placeholder="Linkedin"
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            icon="fab fa-instagram"
            name="instagram"
            value={this.state.instagram}
            placeholder="Instagram"
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
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Make your profile stand out!</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  value={this.state.handle}
                  placeholder="Profile Handle"
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                <SelectListGroup
                  options={statusOptions}
                  name="status"
                  value={this.state.status}
                  placeholder="Status"
                  onChange={this.onChange}
                  error={errors.status}
                  info="How would you define yourself?"
                />
                <TextFieldGroup
                  name="company"
                  value={this.state.company}
                  placeholder="Company"
                  onChange={this.onChange}
                  error={errors.company}
                  info="Where do you work?"
                />
                <TextFieldGroup
                  name="website"
                  value={this.state.website}
                  placeholder="Website"
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your website URL."
                />
                <TextFieldGroup
                  name="location"
                  value={this.state.location}
                  placeholder="Location"
                  onChange={this.onChange}
                  error={errors.location}
                  info="City, State, Country."
                />
                <TextFieldGroup
                  name="skills"
                  value={this.state.skills}
                  placeholder="Profile skills"
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Use comma-seperated values (e.g. HTML, CSS, JavaScript)."
                />
                <TextFieldGroup
                  name="githubUsername"
                  value={this.state.githubUsername}
                  placeholder="GitHub Username"
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="If your want to display your latest repositories."
                />
                <TextAreadFieldGroup
                  name="bio"
                  value={this.state.bio}
                  placeholder="Bio"
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
                    className="btn btn-light">
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

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
