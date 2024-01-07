import { Request, Response } from 'express';
import storyService from '../services/storyService';
import { validationResult } from 'express-validator';
import StoryService from "../services/storyService";
class StoryController {
    async createStory(req: Request, res: Response) {
        try {
            const errors = validationResult(req); // Validate request
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }
            const { title, topic } = req.body;
            const result = await storyService.createStory(title, topic);
            res.status(201).json(result);
        } catch (error: any) {
            console.error('Error creating story:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getStories(req: Request, res: Response) {
        try {
            const result = await storyService.getStories();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching stories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getPreviousSentence(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }
            const { storyId } = req.params;
            const result = await storyService.getPreviousSentence(storyId);
            res.status(200).json(result);
        } catch (error: any) {
            console.error('Error getting previous sentence:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async addSentence(req: Request, res: Response) {
        const { storyId } = req.params;
        const { newSentence } = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }
            const result = await storyService.addSentence(storyId, newSentence);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding sentence:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async endStory(req: Request, res: Response) {
        try {
            const { storyId } = req.params;

            // Mark the story as complete
            const completedStory = await StoryService.endStory(storyId);

            res.status(200).json({ success: true, data: completedStory });
        } catch (error) {
            console.error('Error ending story:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

export default new StoryController();
