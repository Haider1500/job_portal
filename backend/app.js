require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/dbConnection");

const app = express();
dbConnection();

module.exports = app;
