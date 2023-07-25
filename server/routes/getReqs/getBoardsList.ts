import { Router } from "express";

const GetBoardsList = Router();

GetBoardsList.get("/:groupId", (req, res) => {
  res.send("get boards list request received!");
});

export default GetBoardsList;
