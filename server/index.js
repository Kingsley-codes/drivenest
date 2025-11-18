import express from 'express';
import mongoose from "mongoose";
import 'dotenv/config';
import next from "next";
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser'
import passport from 'passport';
import { configurePassportStrategies } from './api/config/passport.js';
import authRouter from './api/routes/authRoutes.js';
import carRouter from './api/routes/carRoutes.js';



const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});

app.prepare().then(async () => {
    const server = express();

    // Call strategy setup early
    configurePassportStrategies();

    // Middleware
    server.use("/api", cookieParser());
    server.use("/api", express.json());
    server.use("/api", express.urlencoded({ extended: true }));
    server.use("/api", passport.initialize());


    // ===== FIX 1: CSP & Helmet Configuration =====
    // server.use(
    //     helmet({
    //         contentSecurityPolicy: {
    //             directives: {
    //                 ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    //                 "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts (Next.js needs this)
    //                 "connect-src": ["'self'", "https://drivenest-se33.onrender.com"], // Allow WebSocket connections
    //             },
    //         },
    //         crossOriginEmbedderPolicy: false, // Disable COEP (Next.js needs this)
    //     })
    // );

    server.use("/api",
        helmet({
            contentSecurityPolicy: {
                directives: {
                    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                    "script-src": dev
                        ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
                        : ["'self'"],
                    "connect-src": ["'self'", "https://drivenest-se33.onrender.com"],
                },
            },
            crossOriginEmbedderPolicy: false,
        })
    );



    // Apply rate limiting to API routes
    server.use('/api', limiter);

    // Connect to MongoDB Atlas
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }

    // Define API routes
    server.use("/api/auth", authRouter);  // auth routes
    server.use("/api/cars", carRouter);  // car routes


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
