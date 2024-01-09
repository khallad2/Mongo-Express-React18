import connectDB from "./src/configs/database/connect";
import app from "./src/configs/express";

/**
 * Connect to the MongoDB database.
 */
connectDB();

/**
 * The port on which the server will listen.
 * Defaults to 3000 if not provided in the environment.
 */
const port = process.env.PORT || 3000;

/**
 * Start the server and log the server URL.
 */
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} 🥳`);
});
