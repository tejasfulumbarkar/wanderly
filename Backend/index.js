import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDb  from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") })

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth",authRouter)

app.get("/", (req, res) => {
  res.send("API Running"

    
  );
});

const port = process.env.PORT || 5000 ; // adding or port ensures that if process env does not load port then deafult port will be used 

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Server failed to start", error.message);
  }
};

startServer();
