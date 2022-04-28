const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

router.post("/", stuffCtrl.createThing);
router.get("/", stuffCtrl.getAllThings);

module.exports = router;
