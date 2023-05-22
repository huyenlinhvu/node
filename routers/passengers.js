import { Router } from "express";
import Passenger from "../models/Passenger.js";

const appRouter = new Router();

appRouter.get("/", (req, res) => {
  res.render("home");
});

appRouter.get("/list", async (req, res) => {
  try {
    const passengers = await Passenger.find({}, "Name");
    console.log(passengers);
    res.render("listPassengers", { passengers });
  } catch (error) {
    res.status(500).send("Error retrieving passengers");
  }
});

export default appRouter;
