const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Title
  if(Validator.isEmpty(data.title)) {
    errors.title = "Job title is required.";
  }

  // Company
  if(Validator.isEmpty(data.company)) {
    errors.company = "Company is required.";
  }

  // Starting date
  if(Validator.isEmpty(data.from)) {
    errors.from = "Starting date is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};