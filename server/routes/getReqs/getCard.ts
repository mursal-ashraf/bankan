import { Router } from "express";

const GetCardDetails = Router();

GetCardDetails.get("/:cardId", (req, res) => {
  res.send("get card details request received!");
});

export default GetCardDetails;
