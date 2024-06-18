const express = require("express");
const router = express.Router();
const {
  updateListsValidationRules,
  getAndDeleteListValidationRules,
  postListsValidationRules,
} = require("../utils/validators");
const parseId = require("../middlewares/parseIdMiddleware");
const getLists = require("../controllers/getList");
const postLists = require("../controllers/postList");
const updateLists = require("../controllers/updateList");
const deleteLists = require("../controllers/deleteList");

router.get(
  "/get-lists/:id",
  parseId,
  getAndDeleteListValidationRules,
  getLists
);

router.post("/post-lists", postListsValidationRules, postLists);

router.put("/update-lists", updateListsValidationRules, updateLists);

router.delete(
  "/delete-lists/:id",
  parseId,
  getAndDeleteListValidationRules,
  deleteLists
);

module.exports = router;
