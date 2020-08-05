const express = require("express");

const { getAllrental } = require("../controllers/rental");

const router = express.Router();

router.route("/").get(getAllrental);

module.exports = router;
