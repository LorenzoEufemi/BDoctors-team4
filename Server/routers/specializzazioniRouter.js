const express = require ("express");
const router = express.Router();
const dottoriController = require ("../controllers/specializzazioniController")

router.get("/", dottoriController.index);

router.get("/:id", dottoriController.show);

module.exports= router;