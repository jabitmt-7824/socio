const express = require("express");
const router = express.Router();

const userApiController = require("../../../controllers/api/v1/user_api");

router.post("/signin-user", userApiController.signinUser);

module.exports = router;