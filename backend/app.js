require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/dbConnection");
const userRouter = require("./routes/userRouter");
const { errorMiddleware } = require("./middlewares/error");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, methods: [] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

dbConnection();
app.use(errorMiddleware);

module.exports = app;
