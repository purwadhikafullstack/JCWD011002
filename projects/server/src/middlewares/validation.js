const { body, validationResult } = require("express-validator");
const { messages } = require("../helpers");

const name = body("name").notEmpty().withMessage("Name is empty");

const username = body("username")
  .notEmpty()
  .withMessage("Username is empty")
  .bail()
  .isLength({ min: 8 })
  .withMessage("Min 8 characters")
  .bail()
  .matches(/^(\w|\\_)[\w\d\\_]{7,}$/)
  .withMessage("Username is not valid");

const email = body("email")
  .notEmpty()
  .withMessage("Email is empty")
  .bail()
  .trim()
  .isEmail()
  .withMessage("Email is not valid");

const password = body("password")
  .bail()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage(
    "Password length min 8, uppercase min 1, number min 1, symbol min 1"
  );

const newPassword = body("new_password")
  .bail()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage(
    "Password length min 8, uppercase min 1, number min 1, symbol min 1"
  );

const phone = body("phone")
  .notEmpty()
  .withMessage("Phone is Empty")
  .bail()
  .isMobilePhone()
  .withMessage("Invalid phone number");

const register = [email];
const registration = [name, username, phone, password];
const updateProfile = [name, username, email, phone];
function result(req, res, next) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res
      .status(400)
      .json(
        messages.response({
          message: "Invalid Input",
          data: errors.map((error) => error["msg"]),
        })
      );
  }
  next();
}

module.exports = { register, registration, updateProfile, result };
