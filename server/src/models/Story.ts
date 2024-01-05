// backend/src/models/Story.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IStory extends Document {
    title: string;
    topic?: string;
}

const storySchema: Schema = new Schema({
    title: { type: String, required: true },
    topic: { type: String },
});

const Story = mongoose.model<IStory>('Story', storySchema);

export default Story;
