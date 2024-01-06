import express, { Router } from 'express';
import StoryController from "../controllers/storyController";
import { body } from 'express-validator';

const router: Router = express.Router();

const createStoryRoute = (storyController: typeof StoryController) => storyController.createStory;
const listStoriesRoute = (storyController: typeof StoryController) => storyController.getStories;
const getPreviousSentenceRoute = (storyController: typeof StoryController) => storyController.getPreviousSentence;
const addSentenceRoute = (storyController: typeof StoryController) => storyController.addSentence;

// Use dependency injection when setting up the route
router.post('/create', [
        body('title').notEmpty().withMessage('Title is required'),
        body('topic').optional()],
    createStoryRoute(StoryController)
);

router.get('/all', listStoriesRoute(StoryController));
router.get('/:storyId/previous-sentence', getPreviousSentenceRoute(StoryController));
router.post('/:storyId/add-sentence', [
        body('newSentence').notEmpty().withMessage('Sentence is required'),
],addSentenceRoute(StoryController));
export default router;
