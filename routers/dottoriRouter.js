const upload = require("../middlewares/fileUpload")
const express = require ("express");
const router = express.Router();

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
const checkEmailExist = require ("../middlewares/checkNameExist")


router.get("/", checkNameExist, checkCognomeExist, checkSpecializazioneExist, dottoriController.index);

router.get("/:slug", checkSlugExist, dottoriController.show);

//Aggiunta Multer
router.post("/", upload.single("immagine"), checkNomeValido, checkCognomeValido, checkTelValido, checkEmailValid, checkEmailExist, dottoriController.store);

//Add post function for review
router.post("/:id/recensioni",dottoriController.store)

router.delete("/:slug", dottoriController.destroy);

module.exports= router;



