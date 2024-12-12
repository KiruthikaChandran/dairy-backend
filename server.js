const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI?.trim();
        if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
            throw new Error("Invalid MongoDB URI format");
        }

        console.log(`Connecting to MongoDB URI: ${uri}`);

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};
