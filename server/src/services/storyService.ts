import Story from '../models/Story';
import * as crypto from 'crypto';

class StoryService {
    // Creates a new story with a unique link and saves it to the database
    async createStory(title: string, topic?: string) {
        try {
            const storyCode = crypto.randomUUID();
            const link = `${process.env.UI_URL}/join#${storyCode}`;
            const newStory = new Story({ title, topic, link });
            await newStory.save();
            return { success: true, message: 'Story created successfully', data: newStory };
        } catch (error) {
            console.error('Error creating story:', error);
            throw new Error('Failed to create story. Please try again.'); // Provide a more specific error message
        }
    }

    // Retrieves all stories from the database
    async getStories() {
        try {
            const stories = await Story.find();
            return { success: true, data: { stories } };
        } catch (error) {
            console.error('Error getting stories:', error);
            throw new Error('Failed to fetch stories. Please try again.'); // Provide a more specific error message
        }
    }

    // Adds a new sentence to a story and returns the previous sentence and all sentences
    async addSentence(storyId: string, newSentence: string) {
        try {
            const story = await Story.findOneAndUpdate(
                { _id: storyId },
                { $push: { sentences: newSentence } },
                { new: true }
            );

            if (story) {
                const previousSentence = story.sentences[story.sentences.length - 1] || '';
                return { success: true, data: { previousSentence, allSentences: story.sentences } };
            } else {
                return { success: false, message: 'Story not found' };
            }
        } catch (error) {
            console.error('Error adding sentence:', error);
            throw new Error('Failed to add sentence. Please try again.'); // Provide a more specific error message
        }
    }

    // Marks a story as complete in the database
    async endStory(storyId: string) {
        try {
            const completedStory = await Story.findByIdAndUpdate(storyId, { isComplete: true }, { new: true });
            return completedStory;
        } catch (error) {
            console.error('Error ending story:', error);
            throw new Error('Failed to end story. Please try again.'); // Provide a more specific error message
        }
    }
}

export default new StoryService();
