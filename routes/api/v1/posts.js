const express = require("express");
const passport = require("passport");
const router = express.Router();
const postsApiController = require("../../../controllers/api/v1/post_api");

router.get("/", postsApiController.index);
router.delete("/:id", passport.authenticate("jwt",{session:false}), postsApiController.deletePost);

module.exports = router;