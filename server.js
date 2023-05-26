import passengers from "./routers/passengers.js";
import User from "./models/User.js";

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "connect-flash";
// import passport from "passport";

dotenv.config();

const { APP_HOST, APP_PORT, MONGO_URI, NODE_ENV, SESSION_SECRET } = process.env;

const app = express();

// Déclarer le moteur de rendu à Express
app.set("view engine", "pug");

// Minifier automatiquement les templates PUG en production, mais pas en dev
app.locals.pretty = NODE_ENV !== "production" ? true : false;

app.use(express.static("public"));

// Configure middlewares
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: false })); // Fourni l'objet "req.body" lors de la validation de formulaire
app.use(flash());

// Define routers
app.use("/", passengers);

// Define the middleware function
const requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is logged in, proceed to the next middleware or route handler
    return next();
  } else {
    // User is not logged in, redirect to the login page or show an error
    res.redirect("/login"); // Assuming your login page is "/login"
  }
};

// Use the middleware function for the "/list" route
app.use("/list", requireLogin, passengers);

// Define routes for login and signup
app.get("/login", (req, res) => {
  res.render("login", { messages: [] });
});

app.get("/signup", (req, res) => {
  res.render("signup", { messages: [] });
});

// POST route for user signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists with the provided email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Redirect to the login page
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Signup failed");
  }
});

// POST route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }

  // Set flash message
  req.flash("success", "Logged in successfully");

  // Redirect to the listing passengers page
  res.redirect("/list");
});

app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});

// Connect to the DB
try {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to the DB");

  app.listen(APP_PORT, () =>
    console.log(`Application is running at http://${APP_HOST}:${APP_PORT}`)
  );
} catch (err) {
  console.log("Can not run application", err.message);
}
