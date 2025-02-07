const express = require ("express");
const router = express.Router();
const dottoriController = require ("../controllers/dottoriController")
const checkSlugExist = require ("../middlewares/checkSlugExist")
const checkNameExist = require ("../middlewares/checkNameExist")

router.get("/",checkNameExist, dottoriController.index);

router.get("/:slug", checkSlugExist, dottoriController.show);

router.post("/", dottoriController.store);

router.delete("/:slug", dottoriController.destroy);





module.exports= router;