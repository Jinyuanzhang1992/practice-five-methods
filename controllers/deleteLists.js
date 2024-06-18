const path = require("path");
const filePath = path.join(__dirname, "../mock-data/lists.json");
const listsMock = require(filePath);
const fs = require("fs");
const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");

const deleteLists = (req, res, next) => {
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

  const existingIndex = listsMock.findIndex((item) => item.id === id);
  console.log("id: ", id);
  console.log("id: ", typeof id);
  console.log("listsMock: ", listsMock);
  console.log("existingIndex: ", existingIndex);
  if (existingIndex !== -1) {
    listsMock.splice(existingIndex, 1);
  } else {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }

  fs.writeFile(filePath, JSON.stringify(listsMock, null, 2), (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
};

module.exports = deleteLists;
