import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config as configureDotenv } from 'dotenv';
import storyRoutes from '../routes/story-routes';
import Logger from "../utils/Logger";

// Load environment variables from .env
configureDotenv();

/**
 * Express application setup.
 */
const app: Application = express();

/**
 * CORS configuration options.
 */
const corsOptions: cors.CorsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type', // Should contain Authorization
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/stories', storyRoutes);

/**
 * Error handling middleware.
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.error(`Error: ${err.stack}`);
    res.status(500).send('Internal Server Error');
};

app.use(errorHandler);

export default app;

