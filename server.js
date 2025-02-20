require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

app.use(express.json());
app.use(cors()); // Enable CORS

// Define Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model("Book", bookSchema);

// Function to seed initial data (if the database is empty)
const seedDatabase = async () => {
    try {
        const bookCount = await Book.countDocuments();
        if (bookCount === 0) {
            const books = [
                {
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    genre: "Fiction",
                    description: "A classic novel about the American Dream",
                    price: 20,
                    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg",
                },
                {
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    genre: "Fiction",
                    description: "A powerful story of racial injustice and moral growth",
                    price: 15,
                    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg",
                },
                {
                    title: "1984",
                    author: "George Orwell",
                    genre: "Dystopian",
                    description: "A dystopian vision of a totalitarian future society",
                    price: 25,
                    image: "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
                },
            ];

            await Book.insertMany(books);
            console.log("✅ Database seeded successfully");
        }
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    }
};

seedDatabase();

// API Endpoint to Fetch Books
app.get("/api/books", async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.error("❌ Error fetching books:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
