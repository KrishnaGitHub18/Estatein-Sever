const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database module

// DB health check
router.get('/health', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT NOW() AS now;');
    res.json({ ok: true, now: rows[0].now });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;

