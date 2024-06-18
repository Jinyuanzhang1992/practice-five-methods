const listsMock = require("../mock-data/lists.json");
const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");

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

  const lists = listsMock.find((item) => item.id === id);
  if (!lists) {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }

  res.status(200).json({
    message: "Success",
    data: lists,
    status: 200,
  });
};

module.exports = getList;
