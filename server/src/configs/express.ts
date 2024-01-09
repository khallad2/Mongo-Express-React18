import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import storyRoutes from '../routes/StoryRoutes';
import {configDotenv} from "dotenv";

configDotenv();

const app = express();
// Enable CORS for all routes
const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type', // should contain Authorization
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/stories', storyRoutes);

// Error handling middleware
app.use((err: Error, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

export default app;
