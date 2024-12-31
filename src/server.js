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

app.put("books/:id", (req, res) => {
    // extract the id from the route parameter
    const { id } = req.params;
    // extract theh title and author from the req body 
    const { title, author } = req.body;

    // find the book with the id from the parameter
    const book = books.find((b) => b.id === parseInt(id));
    // if theres to book, print out book not found
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    // Update the book's properties
    if (title) book.title = title;
    if (author) book.author = author;
   
    // Respond with the updated book
    res.status(200).json({ message: "Book updated successfully", book });
})



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})