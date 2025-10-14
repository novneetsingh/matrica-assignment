import express from "express";
import "dotenv/config";
import cors from "cors";
import submissionRoutes from "./routes/submission.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/", (req, res) => {
  res.send("welcome to matrica assignment server");
});

app.use("/api/v1", submissionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
