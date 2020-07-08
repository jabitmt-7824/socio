const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeController");

router.get("/toggles", likeController.toggleLike);

module.exports = router;