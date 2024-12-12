import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5007;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debugging middleware for routes
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI?.trim();
        if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
            throw new Error("Invalid MongoDB URI format");
        }

        console.log(`Connecting to MongoDB URI: ${uri}`); // Debugging log

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

// Root endpoint
app.get("/", (req, res) => {
    res.send("Your thoughts, your story, securely kept 🤍");
});

// Start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch(err => {
    console.error('Error in connecting to MongoDB:', err);
});
