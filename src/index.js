require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");

const router = require("./routers/index");
const errorHandler = require("./middlewares/errorMiddleware");
const createLogger = require("./utils/logger");
const logger = createLogger(__filename);
const morgan = require("./utils/morgan");
const swaggerJsDoc = require("./utils/swagger");

app.use(helmet());

app.use(cors());
app.use(express.json());

app.use(morgan);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use("/v1/lists", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
