import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("WELCOME TO MERN STACK");
});

//Route to save a new book
app.post("/book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      response.status(400).send({
        message: "Send all the required field:title,author,publishedyear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)

  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });
