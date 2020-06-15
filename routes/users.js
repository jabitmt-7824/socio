const express = require("express");
const router = express.Router();
const passport = require('passport');

const usersController = require("../controllers/usersController");

router.get("/profile/:id",passport.checkAuthentication,usersController.profile);
router.get("/signup",usersController.signupPage);
router.get("/signin",usersController.signinPage);

router.post("/signup-user", usersController.singnupUser);
router.post("/signin-user", passport.authenticate("local" ,{failureRedirect:"/user/signin"},),usersController.signinUser);
router.get("/signout",usersController.signOut);
module.exports = router;