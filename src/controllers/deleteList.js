const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");
const { deleteListByIndex, findIndexById } = require("../models/list");

const deleteLists = async (req, res, next) => {
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

  const existingIndex = findIndexById(id);

  if (existingIndex !== -1) {
    try {
      await deleteListByIndex(existingIndex, next);
      res.sendStatus(204);
    } catch (err) {
      return next(err);
    }
  } else {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }
};

module.exports = deleteLists;
