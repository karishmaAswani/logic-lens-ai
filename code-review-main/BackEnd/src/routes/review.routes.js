const express = require('express');
const reviewController = require("../controllers/review.controller");

const router = express.Router();

router.post("/", reviewController.reviewCode);

module.exports = router;
