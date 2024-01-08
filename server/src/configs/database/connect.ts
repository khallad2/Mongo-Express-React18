import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI + 'one-line-story' || '/mongodb://127.0.0.1:27017/one-line-story';
        await mongoose.connect(uri, );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

export default connectDB;
