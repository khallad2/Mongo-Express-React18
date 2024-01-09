import connectDB from "./src/configs/database/connect";
import app from "./src/configs/express";

// Connect to MongoDB
connectDB();

// Define a port for the server to listen on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} 🥳`);
});



