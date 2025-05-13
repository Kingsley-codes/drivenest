import express from 'express';
import mongoose from "mongoose";
import 'dotenv/config';
import next from "next";



const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.prepare().then(async () => {
    const server = express();

    // Middleware
    server.use(express.json());

    // Connect to MongoDB Atlas
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }

    // Define API routes



    server.get("/api/hello", (req, res) => {
        res.json({ message: "Hello from Express API!" });
    });

    // Handle all other Next.js requests
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
