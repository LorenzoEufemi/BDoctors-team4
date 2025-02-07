const upload = require("../middlewares/fileUpload")
const express = require ("express");
const router = express.Router();

const checkSlugExist = require ("../middlewares/checkSlugExist")
const checkNameExist = require ("../middlewares/checkNameExist")
const dottoriController = require ("../controllers/dottoriController");
const dbConnection = require("../data/dbConnection");


router.get("/",checkNameExist, dottoriController.index);

router.get("/:slug", checkSlugExist, dottoriController.show);

//Aggiunta Multer
router.post("/", upload.single("immagine"), dottoriController.store);

//Add post function for review
router.post("/:slug/recensioni",dottoriController.store)

router.delete("/:slug", dottoriController.destroy);

module.exports= router;



