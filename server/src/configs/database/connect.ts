import mongoose, { ConnectOptions } from 'mongoose';

/**
 * Connect to MongoDB using Mongoose.
 * @returns {Promise<void>} A Promise that resolves once the connection is established or rejects on error.
 */
const connectDB = async (): Promise<void> => {
    try {
        // Construct MongoDB connection URI
        const uri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

        // Connection options for Mongoose
        const options: ConnectOptions = {};

        // Attempt to connect to MongoDB
        await mongoose.connect(uri, options);

        // Log a success message upon successful connection
        console.log(`Connected to MongoDB on ${uri} 🥳`);
    } catch (error) {
        // Log an error message if the connection fails
        console.error('Failed to connect to MongoDB:', error);
    }
};

export default connectDB;
