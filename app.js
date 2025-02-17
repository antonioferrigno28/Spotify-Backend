require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

const Router = require("./routes/routes");
app.use("/", Router);

app.listen(APP_PORT, () => {
  console.log(`Server listening at ${APP_HOST}:${APP_PORT}`);
});
