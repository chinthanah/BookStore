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

//Route to save a new book(post a book)
app.post("/books", async (request, response) => {
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

//Route to get all the books from the database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ message: error.message });
  }
});

//Route to get one book from the database
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(400).send({ message: error.message });
  }
});

//Route to update

app.put("/books/:id", async (request, response) => {
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

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to delete a book

app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send("Book not found");
    }

    return response.status(200).send("Book deleted successfully");
  } catch (error) {
    console.log(error.message);
    return response.status(404).send({ message: error.message });
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
