const express = require("express");
const router = express.Router();
const {
  updateListsValidationRules,
  getAndDeleteListValidationRules,
  postListsValidationRules,
} = require("../utils/validators");
const parseId = require("../middlewares/parseIdMiddleware");
const getLists = require("../controllers/getLists");
const postLists = require("../controllers/postLists");
const updateLists = require("../controllers/updateLists");
const deleteLists = require("../controllers/deleteLists");

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
