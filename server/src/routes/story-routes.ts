import express, { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import StoryController from '../controllers/StoryController';

const router: Router = express.Router();

/**
 * Dependency injection function for creating a story.
 * @param {typeof StoryController} storyController - The StoryController class.
 * @returns {function(Request, Response): Promise<void>} The route handler function.
 */
const createStoryRoute = (storyController: typeof StoryController) => storyController.createStory;

/**
 * Dependency injection function for listing all stories.
 * @param {typeof StoryController} storyController - The StoryController class.
 * @returns {function(Request, Response): Promise<void>} The route handler function.
 */
const listStoriesRoute = (storyController: typeof StoryController) => storyController.getStories;

/**
 * Dependency injection function for adding a sentence to a story.
 * @param {typeof StoryController} storyController - The StoryController class.
 * @returns {function(Request, Response): Promise<void>} The route handler function.
 */
const addSentenceRoute = (storyController: typeof StoryController) => storyController.addSentence;

/**
 * Dependency injection function for ending a story.
 * @param {typeof StoryController} storyController - The StoryController class.
 * @returns {function(Request, Response): Promise<void>} The route handler function.
 */
const endStoryRoute = (storyController: typeof StoryController) => storyController.endStory;

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
router.post('/:storyId/end', endStoryRoute(StoryController));

export default router;
