import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { todoRouter } from "./routes/todo.js";

dotenv.config();
const allowedorigins=[
  "https://todos-listapp.web.app",
  "http://localhost:3000"
]
const app = express();
const port=process.env.PORT || 5000
app.use(express.json());
app.use(cors({
  origin:allowedorigins,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});
app.get('/',(req,res)=>res.send("API Working"))
app.use("/api/auth", authRouter);
app.use("/api", todoRouter);

app.listen(port, () => {
  console.log("Server is running!");
});
