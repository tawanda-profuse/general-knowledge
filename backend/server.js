"use strict";
require("dotenv").config(); // Load ENV variables

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const Quiz = require("./models/quiz.js");

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cors());

app.get("/categories", async (req, res) => {
  try {
    const categories = await Quiz.find({ isApproved: true }).select("category");

    res.status(200).send({
      categories: categories,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({
      message: "An error has occurred while fetching the quizzes",
    });
  }
});

app.get("/:category", async (req, res) => {
  try {
    const questions = await Quiz.find({ category: req.params.category });

    res.status(200).send({
      questions: questions,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({
      message: "An error has occurred while fetching the quizzes",
    });
  }
});

// Creating a new quiz
app.post("/quiz", async (req, res, next) => {
  try {
    const quiz = new Quiz({
      category: req.body.category,
      isApproved: false,
      quiz: req.body.quiz,
    });

    await quiz.save();

    res.status(200).send({
      message: "Quiz created successfully",
      quiz: quiz,
    });
  } catch (error) {
    console.error("An error has occurred", error);
    return res
      .status(500)
      .send({ message: "An error has occurred while saving the quiz" });
  }
});

// Conditionally listen on a port only if NODE_ENV=development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Export the app for serverless function in production (Vercel)
module.exports = app;
