const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  // Name
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name is required.';
  }

  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters.';
  }

  // Email
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }

  // Password
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }
  
  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters.';
  }

  // Confirm password
  if(Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'You must confirm your password.';
  }

  if(!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};