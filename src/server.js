const express = require("express"); 
const app = express()
const PORT = 6000;

// middleware 
app.use(express.json());

// data
const books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
]

// Routes

// GET /books
app.get("/books", (req, res) => {
    res.json(books);
});


// POST /books
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" })
    }

    const newBook = {
        id: books.length + 1, 
        title, 
        author,
    };


    books.push(newBook)
    res.status(201).json(newBook);

});


// GET /boooks/:id
app.get("books/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})