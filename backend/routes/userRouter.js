// const register = require("../controllers/userController");
const { login, register } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.get("/login", login);

module.exports = router;
