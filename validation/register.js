const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";
  data.balance = !isEmpty(data.balance) ? data.balance : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.birthday)) {
    errors.birthday = "birthday field is required";
  }
  if (Validator.isEmpty(data.balance)) {
    errors.balance = "balance field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords Must match";
  }
  if (Validator.isAfter(data.birthday)) {
    errors.birthday = "date is invalid";
  }
  if (!Validator.isNumeric(data.balance)) {
    errors.birthday = "balance must be number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
