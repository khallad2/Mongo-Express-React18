import express, { Router } from 'express';
import StoryController from "../controllers/storyController";
import { body } from 'express-validator';
const router: Router = express.Router();

const createStoryRoute = (storyController: typeof StoryController) => storyController.createStory;

// Use dependency injection when setting up the route
router.post('/create',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('topic').optional()
    ],
    createStoryRoute(StoryController));
export default router;
