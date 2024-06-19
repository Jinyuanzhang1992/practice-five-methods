const {
  deleteListByIndex,
  findIndexById,
  getListById,
  postListById,
  updateListById,
} = require("../models/list");
const createNewErrors = require("../utils/createNewErrors");

const getList = (req, res, next) => {
  const { id } = req.params;
  const list = getListById(id);
  if (!list) {
    const err = createNewErrors("List not found", 404, "notFound");
    return next(err);
  }
  res.status(200).json({
    message: "Success",
    data: list,
  });
};

const deleteList = async (req, res, next) => {
  const { id } = req.params;
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

const postList = async (req, res, next) => {
  const { name, completed } = req.body.data;
  try {
    const newList = await postListById(name, completed, next);
    res.status(201).json({
      message: "List created successfully",
      data: newList,
    });
  } catch (err) {
    return next(err);
  }
};

const updateList = async (req, res, next) => {
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

module.exports = { getList, deleteList, postList, updateList };
