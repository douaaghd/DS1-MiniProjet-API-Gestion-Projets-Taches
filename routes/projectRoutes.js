const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Project routes OK" });
});

module.exports = router;
