import { Router } from "express";
import Passenger from "../models/Passenger.js";

const appRouter = new Router();

appRouter.get("/", (req, res) => {
  res.render("home", { messages: [] }); // Pass empty array as default value for messages
});

appRouter.get("/list", async (req, res) => {
  try {
    const filter = {}; // Initialize an empty filter object

    // Retrieve the filter values from the query parameters
    const { gender, age, ticketClass } = req.query;

    // Add the filter conditions based on the selected criteria
    if (gender && gender !== "all") {
      filter.Sex = gender;
    }

    if (age && age !== "") {
      if (age === "0-20") {
        filter.Age = { $lte: 20 };
      } else if (age === "21-50") {
        filter.Age = { $gte: 21, $lte: 50 };
      } else if (age === "50+") {
        filter.Age = { $gte: 50 };
      }
    }

    if (ticketClass && ticketClass !== "all") {
      filter.Pclass = Number(ticketClass);
    }

    const passengers = await Passenger.find(filter);
    res.render("listPassengers", { passengers, messages: [] });
  } catch (error) {
    res.status(500).send("Error retrieving passengers");
  }
});

export default appRouter;
