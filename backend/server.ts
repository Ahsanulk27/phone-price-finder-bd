import express from "express";
import cors from "cors";
import searchRoute from "./routes/search";

const app = express();
const PORT = 3001;

app.use(cors());

// Add this debugging middleware BEFORE your routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/api", searchRoute);

// Add a test route to verify server is working
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});