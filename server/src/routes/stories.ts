import express, { Router } from 'express';
import StoryController from "../controllers/storyController";
import { body } from 'express-validator';

const router: Router = express.Router();

// Use dependency injection when setting up the route
const createStoryRoute = (storyController: typeof StoryController) => storyController.createStory;
const listStoriesRoute = (storyController: typeof StoryController) => storyController.getStories;
const getPreviousSentenceRoute = (storyController: typeof StoryController) => storyController.getPreviousSentence;
const addSentenceRoute = (storyController: typeof StoryController) => storyController.addSentence;

const endStoryRoute = (storyController: typeof StoryController) => storyController.endStory;

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

router.post('/:storyId/end', StoryController.endStory);

router.post('/:storyId/end', StoryController.endStory);
export default router;
