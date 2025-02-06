const express = require ("express");
const router = express.Router();
const dottoriController = require ("../controllers/dottoriController")

router.get("/", dottoriController.index);

router.get("/:slug", dottoriController.show);

router.post("/", dottoriController.store);

router.delete("/:slug", dottoriController.destroy);





module.exports= router;