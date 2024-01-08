import { Request, Response } from 'express';
import storyService from '../services/storyService';
import { validationResult } from 'express-validator';
import StoryService from '../services/storyService';

class StoryController {
    // Creates a new story based on the provided request body
    async createStory(req: Request, res: Response) {
        try {
            const errors = validationResult(req); // Validate request
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { title, topic } = req.body;
            const result = await storyService.createStory(title, topic);

            // Return the newly created story in the response with a 201 status code
            res.status(201).json(result);
        } catch (error: any) {
            console.error('Error creating story:', error);

            // Handle internal server error and provide a more specific error message
            res.status(500).json({ success: false, message: 'Failed to create story. Please try again.' });
        }
    }

    // Retrieves all stories from the database
    async getStories(req: Request, res: Response) {
        try {
            const result = await storyService.getStories();

            // Return the list of stories in the response with a 200 status code
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching stories:', error);

            // Handle internal server error and provide a more specific error message
            res.status(500).json({ success: false, message: 'Failed to fetch stories. Please try again.' });
        }
    }

    // Adds a new sentence to a story based on the provided request parameters and body
    async addSentence(req: Request, res: Response) {
        const { storyId } = req.params;
        const { newSentence } = req.body;

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const result = await storyService.addSentence(storyId, newSentence);

            // Return the updated story with the new sentence in the response with a 201 status code
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding sentence:', error);

            // Handle internal server error and provide a more specific error message
            res.status(500).json({ success: false, message: 'Failed to add sentence. Please try again.' });
        }
    }

    // Marks a story as complete based on the provided request parameters
    async endStory(req: Request, res: Response) {
        try {
            const { storyId } = req.params;

            // Mark the story as complete
            const completedStory = await StoryService.endStory(storyId);

            // Return the completed story in the response with a 200 status code
            res.status(200).json({ success: true, data: completedStory });
        } catch (error) {
            console.error('Error ending story:', error);

            // Handle internal server error and provide a more specific error message
            res.status(500).json({ success: false, message: 'Failed to end story. Please try again.' });
        }
    }
}

export default new StoryController();
