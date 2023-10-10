import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      requires: true,
    },
    author: {
      type: String,
      requires: true,
    },
    publishedYear: {
      type: String,
      requires: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Cat", bookSchema);
