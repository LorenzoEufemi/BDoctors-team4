const upload = require("../middlewares/fileUpload")
const express = require ("express");
const router = express.Router();
//import middlewares
const checkSlugExist = require ("../middlewares/checkSlugExist")
const checkNameExist = require ("../middlewares/checkNameExist")
const checkSpecializazioneExist = require ("../middlewares/checkSpecializzazioneExist")
const checkCognomeExist = require("../middlewares/chekCognomeExist")
const dottoriController = require ("../controllers/dottoriController");
const dbConnection = require("../data/dbConnection");
const checkNomeValido = require("../middlewares/checkNomeValido");
const checkCognomeValido = require("../middlewares/checkCognomeValido")
const checkTelValido = require ("../middlewares/checkTelValido")
const checkEmailValid = require("../middlewares/checkEmailValid")
const checkEmailExist = require ("../middlewares/checkEmailExist")



router.get("/", dottoriController.index);
// checkNameExist, checkCognomeExist, checkSpecializazioneExist,  ???

router.get("/:slug", checkSlugExist, dottoriController.show);

//Aggiunta Multer
router.post("/", upload.single("immagine"), checkNomeValido, checkCognomeValido, checkTelValido, checkEmailValid, checkEmailExist, dottoriController.store);

//Add post function for review
router.post("/:id/recensioni", dottoriController.storeRecensioni)

router.delete("/:slug", dottoriController.destroy);

module.exports= router;