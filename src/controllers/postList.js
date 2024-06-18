const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");
const { postListById } = require("../models/list");

const postList = async (req, res, next) => {
  const { name, completed } = req.body.data;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      errors.array()
    );
    return next(err);
  }

  try {
    const newList = await postListById(name, completed, next);
    res.status(201).json({
      message: "List created successfully",
      data: newList,
      status: 201,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = postList;
