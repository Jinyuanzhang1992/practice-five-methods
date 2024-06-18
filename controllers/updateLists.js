const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const filePath = path.join(__dirname, "../mock-data/lists.json");
const listMock = require(filePath);
const createNewErrors = require("../utils/createNewErrors");

const updateLists = (req, res, next) => {
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

  const newList = {
    id,
    name,
    completed,
  };

  const existingIndex = listMock.findIndex((item) => item.id === id);
  if (existingIndex !== -1) {
    listMock[existingIndex] = newList;
  } else {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }

  fs.writeFile(filePath, JSON.stringify(listMock, null, 2), (err) => {
    if (err) {
      return next(err);
    }
  });

  res.status(200).send({
    message: "List updated successfully",
    data: {
      id,
      name,
      completed,
    },
  });
};

module.exports = updateLists;
