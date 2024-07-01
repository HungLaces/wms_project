import express from "express";
import cors from "cors";
import "dotenv/config";
import initRoutes from "./routes/index.js";
import connectDatabase from "./config/connectDB";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

initRoutes(app);
const port = process.env.PORT || 5500;
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Example app listening on port ${port}`);
});
