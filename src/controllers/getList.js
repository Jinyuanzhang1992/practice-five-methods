const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");
const { getListById } = require("../models/list");

const getList = (req, res, next) => {
  const { id } = req.params;

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

  const list = getListById(id);
  if (!list) {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }

  res.status(200).json({
    message: "Success",
    data: list,
    status: 200,
  });
};

module.exports = getList;
