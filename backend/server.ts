import express from "express";
import cors from "cors";
import searchRoute from "./routes/search";

const app = express();
const PORT = 3001;

app.use(cors());
app.use("/api", searchRoute);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
