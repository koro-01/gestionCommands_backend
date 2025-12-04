const express = require("express");
const router = express.Router();
const preparateurController = require("../controllers/preparateurController");

// CRUD routes
router.get("/", preparateurController.getAll);
router.get("/:id", preparateurController.getById);
router.post("/", preparateurController.create);
router.put("/:id", preparateurController.update);
router.delete("/:id", preparateurController.delete);

module.exports = router;
