const express = require('express');
const router = express.Router();
const db = require('../../db'); // Import the database module

// DB health check
router.get('/userData', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT userid, email FROM users ORDER BY userid;'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

