require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const app = express();

const router = require("./routers/index");
const errorHandler = require("./middlewares/errorMiddleware");

app.use(helmet());

app.use(express.json());

app.use("/lists", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
