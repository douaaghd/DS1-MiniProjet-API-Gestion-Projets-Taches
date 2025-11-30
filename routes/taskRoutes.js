const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Task routes OK" });
});

module.exports = router;

