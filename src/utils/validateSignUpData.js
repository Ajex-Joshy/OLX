import validator from "validator";

const validateSignUpData = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  if (!firstName.trim()) {
    throw new Error("First name is required.");
  }
  if (!validator.isAlpha(firstName)) {
    throw new Error("First name should contain only letters.");
  }
  if (!lastName.trim()) {
    throw new Error("Last name is required.");
  }
  if (!validator.isAlpha(lastName)) {
    throw new Error("Last name should contain only letters.");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be at least 6 characters long.");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }
};

export default validateSignUpData;
