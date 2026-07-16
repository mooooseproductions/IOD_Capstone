import express from 'express';
import cors from 'cors';
import userRoute from './src/routes/userRoute';
import brewRoute from './src/routes/brewRoutes';
import authRoute from './src/routes/authRoutes';
import lookupRoute from './src/routes/lookupRoutes';
import favouriteRoute from './src/routes/favouriteRoute';
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BarelyBrewing API is running",
  });
});

app.use("/api/user", userRoute);
app.use("/api/brew", brewRoute);
app.use("/api/auth", authRoute);
app.use("/api/lookup", lookupRoute);
app.use("/api/favourites", favouriteRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});