import express from 'express';
import cors from 'cors';
import userRoute from './src/routes/userRoute';
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BarelyBrewing API is running",
  });
});

app.use("/api/user", userRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});