import express, { Request } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

morgan.token("data", (request: Request) =>
  request.method === "POST" ? JSON.stringify(request.body) : " "
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from the server of bankan");
});

app.listen(port, () => {
  console.log(`Bankan API listening at port ${port}...`);
});
