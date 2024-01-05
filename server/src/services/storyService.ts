import Story from '../models/Story';

class StoryService {
    async createStory(title: string, topic?: string) {
        try {
            const newStory = new Story({ title, topic });
            await newStory.save();
            return { success: true, message: 'Story created successfully' };
        } catch (error) {
            console.error('Error creating story:', error);
            throw new Error('Internal server error');
        }
    }
}

export default new StoryService;
