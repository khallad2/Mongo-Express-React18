/**
 * @fileoverview Service class for managing story-related operations.
 */
import Story,{IStory} from '../models/Story';
import * as crypto from 'crypto';
class StoryService {
    /**
     * Creates a new story with a unique link and saves it to the database.
     * @param {string} title - The title of the story.
     * @param {string} [topic] - The topic of the story (optional).
     * @returns {Promise<{ success: boolean, message: string, data: Story }>} A Promise containing the result of the operation.
     */
    async createStory(title: string, topic?: string): Promise<{ success: boolean, message: string, data: IStory }> {
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

    /**
     * Retrieves all stories from the database.
     * @returns {Promise<{ success: boolean, data: { stories: Story[] } }>} A Promise containing the result of the operation.
     */
    async getStories(): Promise<{ success: boolean, data: { stories: IStory[] } }> {
        try {
            const stories = await Story.find();
            return { success: true, data: { stories } };
        } catch (error) {
            console.error('Error getting stories:', error);
            throw new Error('Failed to fetch stories. Please try again.'); // Provide a more specific error message
        }
    }

    /**
     * Adds a new sentence to a story and returns the previous sentence and all sentences.
     * @param {string} storyId - The ID of the story.
     * @param {string} newSentence - The new sentence to be added.
     * @returns {Promise<{ success: boolean, message: string, data: { } }>} A Promise containing the result of the operation.
     */
    async addSentence(storyId: string, newSentence: string): Promise<{ success: boolean, message: string, data: { } }> {
        try {
            const story = await Story.findOneAndUpdate(
                { _id: storyId },
                { $push: { sentences: newSentence } },
                { new: true }
            );

            if (story) {
                const previousSentence = story.sentences[story.sentences.length - 1] || '';
                return { success: true, message: 'success',
                    data: { previousSentence, allSentences: story.sentences } };
            } else {
                return { success: false, message: 'Story not found', data: {} };
            }
        } catch (error) {
            console.error('Error adding sentence:', error);
            throw new Error('Failed to add sentence. Please try again.'); // Provide a more specific error message
        }
    }

    /**
     * Marks a story as complete in the database.
     * @param {string} storyId - The ID of the story.
     * @returns {Promise<Story>} A Promise containing the completed story.
     */
    async endStory(storyId: string) {
        try {
            const completedStory = await Story.findByIdAndUpdate(storyId, { isComplete: true }, { new: true });
            return completedStory
        } catch (error) {
            console.error('Error ending story:', error);
            throw new Error('Failed to end story. Please try again.'); // Provide a more specific error message
        }
    }
}

export default new StoryService();
