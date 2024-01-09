// express.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import routes
import storyRoutes from '../routes/stories';

const app = express();
// Enable CORS for all routes
const corsOptions = {
    origin: 'http://localhost:5173', // Update this with the actual origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
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
