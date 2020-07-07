const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeController");

router.get("/toggle", likeController.toggleLike);

module.exports = router;