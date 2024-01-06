import mongoose, {Schema, Document} from 'mongoose';

interface IStory extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    topic?: string;
    sentences: string[];  // Corrected: Change to an array of strings
}

const storySchema: Schema = new Schema({
    title: { type: String, required: true },
    topic: { type: String },
    sentences: { type: [String], default: [] },
});

const Story = mongoose.model<IStory>('Story', storySchema);

export default Story;
