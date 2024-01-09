import express, { Router } from 'express';
import { body } from 'express-validator';
import StoryController from "../controllers/StoryController";

const router: Router = express.Router();

// Use dependency injection when setting up the route
const createStoryRoute = (storyController: typeof StoryController) => storyController.createStory;
const listStoriesRoute = (storyController: typeof StoryController) => storyController.getStories;
const addSentenceRoute = (storyController: typeof StoryController) => storyController.addSentence;
const endStoryController = (storyController: typeof StoryController) => storyController.endStory;

// Route to create a new story
router.post(
    '/create',
    [
            body('title').notEmpty().withMessage('Title is required'),
            body('topic').optional(),
    ],
    createStoryRoute(StoryController)
);

// Route to get all stories
router.get('/all', listStoriesRoute(StoryController));

// Route to add a sentence to a story
router.post(
    '/:storyId/add-sentence',
    [
            body('newSentence').notEmpty().withMessage('Sentence is required'),
    ],
    addSentenceRoute(StoryController)
);

// Route to end a story
router.post('/:storyId/end', endStoryController(StoryController));

export default router;
