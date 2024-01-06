// backend/src/controllers/storyController.ts
import { Request, Response } from 'express';
import storyService from '../services/storyService';
import { validationResult } from 'express-validator';


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
}

export default new StoryController();
