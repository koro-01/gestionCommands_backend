const express = require("express");
const router = express.Router();
const commandController = require("../controllers/commandController");

// CRUD routes
router.get("/", commandController.getAll);
router.get("/:id", commandController.getById);
router.post("/", commandController.create);
router.put("/:id", commandController.update);
router.delete("/:id", commandController.delete);

module.exports = router;
