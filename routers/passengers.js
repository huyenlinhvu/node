import { Router } from "express";
import Passenger from "../models/Passenger.js";

const appRouter = new Router();

appRouter.get("/", (req, res) => {
  res.render("home", { messages: [] }); // Pass empty array as default value for messages
});

appRouter.get("/list", async (req, res) => {
  try {
    const passengers = await Passenger.find();
    console.log(typeof passengers);
    res.render("listPassengers", { passengers, messages: [] }); // Pass empty array as default value for messages
  } catch (error) {
    res.status(500).send("Error retrieving passengers");
  }
});

export default appRouter;
