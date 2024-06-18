const path = require("path");
const fs = require("fs").promises;

const filePath = path.join(__dirname, "../mock-data/lists.json");
const listsMock = require(filePath);

const updateToFile = async (list, next) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(list, null, 2));
  } catch (err) {
    return next(err);
  }
};

const getListById = (id) => {
  return listsMock.find((item) => item.id === id);
};

const findIndexById = (id) => {
  return listsMock.findIndex((item) => item.id === id);
};

const deleteListByIndex = async (existingIndex, next) => {
  listsMock.splice(existingIndex, 1);
  await updateToFile(listsMock, next);
};

const postListById = async (name, completed, next) => {
  let maxId = listsMock.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );
  const newList = { id: ++maxId, name, completed };
  const listAfterPost = [...listsMock, newList];
  await updateToFile(listAfterPost, next);
  return newList;
};

const updateListById = async (existingIndex, id, name, completed, next) => {
  const newList = {
    id,
    name,
    completed,
  };
  listsMock[existingIndex] = newList;
  await updateToFile(listsMock, next);
  return newList;
};

module.exports = {
  getListById,
  findIndexById,
  deleteListByIndex,
  postListById,
  updateListById,
};
