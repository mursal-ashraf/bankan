import { Router } from "express";

const CreateNewCard = Router();

CreateNewCard.post("/", (req, res) => {
  res.send("create card details request received!");
});

export default CreateNewCard;
