import path from "path";
import fs from "fs/promises";
import express, { Express } from "express";

const BOOK_DIR = path.resolve("books");
export default function register(app: Express) {
  const subrouter = express.Router();
  app.use("/bookService", subrouter);

  subrouter.get("/list", async (req, res) => {
    const files = await fs.readdir(BOOK_DIR);
    res.json({ books: files });
    res.end();
  });

  subrouter.get("/get/:name", async (req, res) => {
    const bookPath = path.resolve(BOOK_DIR, req.params.name);
    if (!bookPath.startsWith(BOOK_DIR)) {
      res.statusCode = 400;
      res.end();
    }
    res.sendFile(bookPath);
  });
}
