// logiques de directions des différentes routes de l'application concernant les sauces
const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.updateOneSauce);
router.delete("/:id", auth, saucesCtrl.deleteOneSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;
