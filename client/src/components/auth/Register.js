import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import propTypes from "prop-types";
import classnames from "classnames";

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
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control", { "is-invalid": errors.name })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  { errors.name && (<div className="invalid-feedback">{errors.name}</div>) }
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control", { "is-invalid": errors.email })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  { errors.email && (<div className="invalid-feedback">{errors.email}</div>) }                  
                  <small className="form-text text-muted">
                    Use a Gravatar email to display your profile image.
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control", { "is-invalid": errors.password })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  { errors.password && (<div className="invalid-feedback">{errors.password}</div>) }                  
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control", { "is-invalid": errors.confirmPassword })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  { errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>) }                  
                </div>
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