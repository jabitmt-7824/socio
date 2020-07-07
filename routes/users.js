const express = require("express");
const router = express.Router();
const passport = require('passport');

const usersController = require("../controllers/usersController");

router.get("/profile/:id",passport.checkAuthentication,usersController.profile);
router.post("/profile/update/:id", passport.checkAuthentication, usersController.updateProfile);
router.get("/signup",usersController.signupPage);
router.get("/signin",usersController.signinPage);

router.post("/signup-user", usersController.singnupUser);
router.post("/signin-user", passport.authenticate("local" ,{failureRedirect:"/user/signin"}),usersController.signinUser);
router.get("/signout",usersController.signOut);
router.get("/auth/google", passport.authenticate("google",{scope:['profile','email']}));
router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:"/user/signin"}),usersController.signinUser);
router.get("/forget-password-form",usersController.forgetForm);
router.post("/forget-password",usersController.forgetPassword);
router.get("/reset-password-form/:access_token",usersController.resetForm);
router.post("/reset-password/:id",usersController.resetPassword);

module.exports = router;