const express = require ("express");
const router = express.Router();

router.get("/", dottoriController.index);

router.get("/:slug", dottoriController.show);

router.post("/", dottoriController.store);

router.delete("/:slug", dottoriController.destroy);





module.exports= router;