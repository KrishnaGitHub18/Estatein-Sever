const express = require("express");
const router = express.Router();
const db = require("../../db"); // Import the database module

// Get property details by ID
router.post("/propertyDetails", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    const { rows } = await db.query(
      "SELECT * FROM details WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching property details:", err);
    res.status(500).json({ error: "Failed to fetch property details" });
  }
});

module.exports = router;
