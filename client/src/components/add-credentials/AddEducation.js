import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onCheck = this.onCheck.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onCheck() {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">Back</Link>
            <h1 className="display-4 text-center">
              Add Education
            </h1>
            <p className="lead text-center">
              Add your education.
            </p>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                label="School"
                id="school"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
              />
              <TextFieldGroup
                label="Degree"
                id="degree"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                label="Field of Study"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={this.state.fieldOfStudy}
                onChange={this.onChange}
                error={errors.fieldOfStudy}
              />
              <TextFieldGroup
                label="From"
                type="date"
                id="from"
                name="from"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <TextFieldGroup
                label="To"
                type="date"
                id="to"
                name="to"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="current"
                  name="current"
                  value={this.value}
                  checked={this.state.current}
                  onChange={this.onCheck}
                />
                <label htmlFor="current" className="form-check-label">
                  Current
                </label>
              </div>
              <TextAreaFieldGroup
                label="Description"
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about your curriculum."
              />
              <input
                type="submit"
                value="Add Education"
                className="btn btn-info mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));