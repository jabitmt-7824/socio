const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
router.get('/', homeController.home);
router.use("/user", require("./users"));
router.use("/post", require("./posts"));
router.use("/comment", require("./comments"));
router.use("/api", require("./api"));
router.use("/like", require("./like"));
router.use("/friend", require("./friends"));

module.exports = router;