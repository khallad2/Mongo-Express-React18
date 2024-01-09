import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri =  `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {});
        // Log a success message upon successful connection
        console.log(`Connected to MongoDB on ${uri} 🥳`);
    } catch (error) {
        // Log an error message if the connection fails
        console.error('Failed to connect to MongoDB:', error);
    }
};

export default connectDB;
