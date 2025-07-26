import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database";
import adminRoutes from "./routes/adminRoutes";
import bodyParser from "body-parser";
import path from "path";
import authRoutes from "./routes/adminRoutes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import cors from "cors";
import { getGenre, getGenres } from "./controllers/genreController";
import { getMovie, getMovies } from "./controllers/movieController";
import { getTheater, getTheaters } from "./controllers/theaterController";
import { handleTopupBalance } from "./controllers/walletController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());

app.use(cors());

connectDB();

app.post("/api/global/handle-payment", handleTopupBalance);
app.use("/api", authRoutes);
app.get("/api/genres", getGenres);
app.get("/api/genres/:id", getGenre);
app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovie);
app.get("/api/theaters", getTheaters);
app.get("/api/theaters/:id", getTheater);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
