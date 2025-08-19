const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database module

// DB health check
router.post("/addUser", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { rows } = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING userid, email;",
      [email, password]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
