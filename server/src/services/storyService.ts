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

    async getStories() {
        try {
            return { success: true, data: {'stories': await Story.find()} };
        } catch (error) {
            console.error('Error getting story:', error);
            throw new Error('Internal server error');
        }
    }
    async getPreviousSentence(storyId: string) {
        try {
            const story = await Story.findById(storyId );
            if(story) {
                const previousSentence = story?.sentences[story.sentences.length - 1] || '';
                return {success: true, data: {'previousSentence': previousSentence, 'allSentences': story['sentences']}};
            } else {
                return {success: false, message: 'story not found'};
            }
        } catch (error){
            console.error('Error getting previous sentence:', error);
            throw new Error('Internal server error');
        }
    }

    async addSentence(storyId: string, newSentence: string) {
        try {
            const story = await Story.findOneAndUpdate(
                { _id: storyId },
                { $push: { sentences: newSentence } },
                { new: true }
            );

            if (story) {
                const previousSentence = story.sentences[story.sentences.length - 1] || '';
                return {success: true, data: {'previousSentence': previousSentence, 'allSentences': story['sentences']}};
            } else {
                return {success: false, message: 'story not found'};
            }
        } catch (error) {
            console.error('Error adding sentence:', error);
            throw new Error('Internal server error');
        }
    }

    async endStory(storyId: string) {
        const completedStory = await Story.findByIdAndUpdate(storyId, { isComplete: true }, { new: true });
        return completedStory;
    }
}

export default new StoryService;
