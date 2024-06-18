// validators.js
const { body, param } = require("express-validator");

const postListsValidationRules = [
  body("data.name")
    .notEmpty()
    // .exists({ checkFalsy: true })
    .withMessage("name is required")
    .isLength({ min: 1 })
    .withMessage("Name must be at least 1 character long"),
  body("data.completed")
    .optional()
    .exists()
    .withMessage("completed is required")
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

const idValidationRules = body("data.id")
  .exists({ checkFalsy: true })
  .withMessage("ID is required")
  .bail()
  .isNumeric()
  .withMessage("ID must be a number");

const updateListsValidationRules = [
  idValidationRules,
  ...postListsValidationRules,
];

const getAndDeleteListValidationRules = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("ID is required")
    .bail()
    .isNumeric()
    .withMessage("ID must be a number"),
];

module.exports = {
  updateListsValidationRules,
  getAndDeleteListValidationRules,
  postListsValidationRules,
};
