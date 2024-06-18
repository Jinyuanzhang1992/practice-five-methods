const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");
const { findIndexById, updateListById } = require("../models/list");

const updateLists = async (req, res, next) => {
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

  const { id, name, completed } = req.body.data;

  const existingIndex = findIndexById(id);
  if (existingIndex !== -1) {
    try {
      const newList = await updateListById(
        existingIndex,
        id,
        name,
        completed,
        next
      );
      res.status(200).send({
        message: "List updated successfully",
        data: newList,
      });
    } catch (err) {
      return next(err);
    }
  } else {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }
};

module.exports = updateLists;
