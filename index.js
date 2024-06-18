require("dotenv").config();
const router = require("./routers");
const errorHandler = require("./middlewares/errorMiddleware");
const express = require("express");
const app = express();

app.use(express.json());

app.use("/lists", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
