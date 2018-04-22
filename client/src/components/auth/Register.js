import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import propTypes from "prop-types";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  value={this.state.name}
                  placeholder="Name"
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.onChange}
                  info="Use a Gravatar email to display your profile image."
                  error={errors.email}
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  error={errors.confirmPassword}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));