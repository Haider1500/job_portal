const router = require("express").Router();

const { login } = require("../controllers/authController");

router.get("/login", login);

module.exports = router;
