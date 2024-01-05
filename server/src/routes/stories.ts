import express, { Router } from 'express';
import StoryController from "../controllers/storyController";

const router: Router = express.Router();

const createStoryRoute = (storyController: typeof StoryController) => storyController.createStory;

// Use dependency injection when setting up the route
router.post('/create', createStoryRoute(StoryController));
export default router;
