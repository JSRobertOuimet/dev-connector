const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // Handle
  if(Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required.";
  }

  if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters.";
  }

  // Status
  if(Validator.isEmpty(data.status)) {
    errors.status = "Status is required.";
  }

  // Skills
  if(Validator.isEmpty(data.skills)) {
    errors.skills = "At least one skill is required.";
  }

  // Website
  if(!isEmpty(data.website)) {
    if(!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL.";
    }
  }

  // Youtube
  if(!isEmpty(data.youtube)) {
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL.";
    }
  }

  // Twitter
  if(!isEmpty(data.twitter)) {
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL.";
    }
  }

  // Facebook
  if(!isEmpty(data.facebook)) {
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL.";
    }
  }

  // Instagram
  if(!isEmpty(data.instagram)) {
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL.";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};