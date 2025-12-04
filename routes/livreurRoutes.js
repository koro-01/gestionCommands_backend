const express = require("express");
const router = express.Router();
const livreurController = require("../controllers/livreurController");

// CRUD routes
router.get("/", livreurController.getAll);
router.get("/:id", livreurController.getById);
router.post("/", livreurController.create);
router.put("/:id", livreurController.update);
router.delete("/:id", livreurController.delete);

module.exports = router;
