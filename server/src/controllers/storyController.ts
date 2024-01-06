// backend/src/controllers/storyController.ts
import { Request, Response } from 'express';
import storyService from '../services/storyService';
import { validationResult } from 'express-validator';
import Story from "../models/Story";


class StoryController {
    async createStory(req: Request, res: Response) {
        try {

            // Validate request
            const errors = validationResult(req);
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
            const stories = await Story.find().distinct('title');
            res.json(stories);
        } catch (error) {
            console.error('Error fetching stories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getPreviousSentence(req: Request, res: Response) {
        const { storyId } = req.params;

        try {
            const story = await Story.findOne({ title: storyId });
            if (story) {
                const previousSentence = story.sentences[story.sentences.length - 1] || '';
                res.json({ previousSentence });
            } else {
                res.status(404).json({ error: 'Story not found' });
            }
        } catch (error) {
            console.error('Error fetching previous sentence:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async addSentence(req: Request, res: Response) {
        const { storyId } = req.params;
        const { newSentence } = req.body;

        try {
            const story = await Story.findOneAndUpdate(
                { title: storyId },
                { $push: { sentences: newSentence } },
                { new: true }
            );

            if (story) {
                const previousSentence = story.sentences[story.sentences.length - 1] || '';
                res.json({ previousSentence });
            } else {
                res.status(404).json({ error: 'Story not found' });
            }
        } catch (error) {
            console.error('Error adding sentence:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new StoryController();
