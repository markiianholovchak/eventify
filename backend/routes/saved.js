const express = require("express");
const { getItems, saveItem } = require("../controllers/savedController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// middleware - require authentification for saved routes
router.use(requireAuth);

// Get saved items from db
router.get("/", getItems);
// Save item to db
router.post("/", saveItem);

module.exports = router;
