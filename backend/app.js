require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/dbConnection");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, methods: [] }));
app.use("/api/v1", userRouter);

dbConnection();

module.exports = app;
