import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

// wrap in try...catch to handle errors
try {
  await db.read();
  db.data ||= { books: [] };
} catch (error) {
  console.error(error);
}

// Get all books
app.get('/books', (req, res) => {
  const books = db.data.books;
  res.json(books);
});

// Create a new book
app.post('/books', async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).send('Title and author are required');
  } else {
    const newBook = { id: Date.now(), title, author };
    db.data.books.push(newBook)
    await db.write()
    res.status(201).json(newBook);
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const book = db.data.books.find(u => u.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).send('Book not found');
  } else {
    db.data.books = db.data.books.filter(u => u.id !== parseInt(req.params.id));
    await db.write();
    res.sendStatus(204);
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3000');
});