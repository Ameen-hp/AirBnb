import express from "express";
import path from "path";
import cors from "cors";
import session from "express-session"; // <-- added import
import MongoStore from "connect-mongo";
import connectDB from "./Src/config/db.js";
import homeRoutes from "./Src/routes/home.js";
import favouriteRoutes from "./Src/routes/favouriteRoutes.js";
import authRoutes from "./Src/routes/authRoutes.js"; // <-- added auth routes
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // <-- adjust frontend URL if needed
  credentials: true, // <-- allow cookies to be sent
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Connect to MongoDB
connectDB();

// Sessions
app.use(session({
  secret: "your_secret",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: "mongodb+srv://devameen:devameen@juniordevelopment.ecnn1hs.mongodb.net/?retryWrites=true&w=majority&appName=JuniorDevelopment" }),
  cookie: { 
    httpOnly: true,
    secure: false, // true if using https
    sameSite: "lax",
  }
}));

// Routes
app.use("/api/auth", authRoutes);          // <-- added auth routes
app.use("/api/homes", homeRoutes);
app.use("/api/favourites", favouriteRoutes);


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
