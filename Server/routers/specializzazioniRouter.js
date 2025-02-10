const express = require ("express");
const router = express.Router();
const dottoriController = require ("../controllers/specializzazioniController")

router.get("/", dottoriController.index);

module.exports= router;