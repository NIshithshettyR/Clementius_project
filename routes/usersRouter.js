const express = require("express");
const router = express.Router();
const userRoute = require("../users/usersData");

router.get("/" , userRoute.user);

module.exports = router;