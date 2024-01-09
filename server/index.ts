import connectDB from "./src/configs/database/connect";
import app from "./src/configs/express";
import Logger from "./src/utils/Logger";

/**
 * Connect to the MongoDB database.
 */
connectDB().then(() => {
    /**
     * The port on which the server will listen.
     * Defaults to 3000 if not provided in the environment.
     */
    const port = process.env.PORT || 3000;

    /**
     * Start the server and log the server URL.
     */
    app.listen(port, () => {
        Logger.info(`Server is running at http://localhost:${port} 🥳`);
    });
}).catch(err => {
    Logger.error(`Failed to connect to MongoDB: ${err}`);
    process.exit(1);
});
