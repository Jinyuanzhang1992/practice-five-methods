const path = require("path");
const fs = require("fs");
const logger = require("../utils/logger");
const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");
const filePath = path.join(__dirname, "../mock-data/lists.json");
const listsMock = require("../mock-data/lists.json");

const postList = (req, res, next) => {
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

  let maxId = listsMock.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  const newList = { id: ++maxId, name, completed };
  const listAfterPost = [...listsMock, newList];

  fs.writeFile(filePath, JSON.stringify(listAfterPost, null, 2), (err) => {
    if (err) {
      return next(err);
    }

    res.status(201).json({
      message: "List created successfully",
      data: newList,
      status: 201,
    });
  });
};

module.exports = postList;
