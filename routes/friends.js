const express = require("express");
const router = express.Router();
const passport = require("passport");

const friendController = require("../controllers/friendController");

router.post("/toggle/:id", passport.checkAuthentication, friendController.friends);

module.exports = router;