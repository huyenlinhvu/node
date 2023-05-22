import passengers from "./routers/passengers.js";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import User from "./models/User.js";

dotenv.config();

const { APP_HOST, APP_PORT, MONGO_URI, NODE_ENV } = process.env;

const app = express();

// Déclarer le moteur de rendu à Express
app.set("view engine", "pug");

// Minifier automatiquement les templates PUG en production, mais pas en dev
app.locals.pretty = NODE_ENV !== "production" ? true : false;

// Déclaration des routeurs et middlewares
app.use(express.urlencoded({ extended: false })); // Fourni l'objet "req.body" lors de la validation de formulaire
app.use("/", passengers);
app.use("/list", passengers);

// Define routes for login and signup
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// POST route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Check if the provided password matches the user's password
  if (user.password !== password) {
    return res.status(401).send("Invalid password");
  }

  // Redirect to the listing page
  res.redirect("/list");
});

// POST route for user signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists with the provided email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  // Create a new user
  const newUser = new User({ name, email, password });

  try {
    // Save the user to the database
    await newUser.save();
    // res.send("Signup successfully!");
    // Redirect to the login page
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Signup failed");
  }
});

// Connect to the DB
try {
  await mongoose.connect(MONGO_URI);
  console.log("Connexion MongoDB établie!");

  app.listen(APP_PORT, () =>
    console.log(`L'application écoute sur http://${APP_HOST}:${APP_PORT}`)
  );
} catch (err) {
  console.log("Impossible de démarrer l'application Node", err.message);
}

//Test connection to db
// import { MongoClient } from "mongodb";

// const uri = "mongodb://localhost:27017";
// const dbName = "titanic";
// const collectionName = "passengers";

// const client = new MongoClient(uri);

// async function main() {
//   try {
//     await client.connect();

//     console.log("Connected to the database");

//     const collection = client.db(dbName).collection(collectionName);

//     const documents = await collection.find().toArray();

//     console.log("Documents in the collection:");
//     console.log(documents);
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     client.close();
//   }
// }

// main();
