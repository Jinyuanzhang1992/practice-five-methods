const express = require("express");
const router = express.Router();
const {
  updateListsValidationRules,
  getAndDeleteListValidationRules,
  postListsValidationRules,
} = require("../utils/validators");
const parseId = require("../middlewares/parseIdMiddleware");
const validation = require("../middlewares/validationMiddleware");
const {
  getList,
  deleteList,
  postList,
  updateList,
} = require("../controllers/listController");

router.get(
  "/get-lists/:id",
  parseId,
  getAndDeleteListValidationRules,
  validation,
  getList
);

router.post("/post-lists", postListsValidationRules, validation, postList);

router.put("/update-lists", updateListsValidationRules, validation, updateList);

router.delete(
  "/delete-lists/:id",
  parseId,
  getAndDeleteListValidationRules,
  validation,
  deleteList
);

module.exports = router;
