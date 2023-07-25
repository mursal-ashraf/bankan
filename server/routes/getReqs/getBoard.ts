import { Router } from "express";

const GetBoard = Router();

GetBoard.get("/:boardId", (req, res) => {
  res.send("get board request received!");
});

export default GetBoard;
