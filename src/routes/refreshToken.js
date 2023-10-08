const express = require("express");
const router = express.Router();
const authMiddleware = require("../app/Middleware/authMiddleware");

router.post("/", authMiddleware.refreshToken);

module.exports = router;
