import express from "express";
import { scrapeDaraz } from "../scraper/daraz";

const router = express.Router();

router.get("/api/search", async (req, res) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const results = await scrapeDaraz(query);
    res.json(results); // even if results is empty
  } catch (err) {
    console.error("Scraping failed:", err.message);
    res.status(500).json({ error: "Scraping failed" });
  }
});

export default router;
