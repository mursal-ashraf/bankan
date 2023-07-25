import express, { Request } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import {
  GetBoard,
  GetBoardsList,
  GetCardDetails,
  CreateNewCard,
} from "./routes";
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
app.use("/get-boards-list", GetBoardsList); //get overview of all boards
app.use("/get-board", GetBoard); //get details of one board
app.use("/get-card-details", GetCardDetails); //get details of a card

app.use("/new-card", CreateNewCard); //make a new card
app.listen(port, () => {
  console.log(`Bankan API listening at port ${port}...`);
});
