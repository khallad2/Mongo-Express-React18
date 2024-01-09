import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import stories from "./src/routes/stories";
import connectDB from "./src/configs/database/connect";
import Cors from 'cors';
import app from "./src/configs/express";
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an Express application

// Define a port for the server to listen on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



