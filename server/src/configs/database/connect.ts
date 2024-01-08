import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Use the provided MongoDB URI or a default URI if not provided
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/one-line-story';

        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {});

        // Log a success message upon successful connection
        console.log('Connected to MongoDB');
    } catch (error) {
        // Log an error message if the connection fails
        console.error('Failed to connect to MongoDB:', error);
    }
};

export default connectDB;
