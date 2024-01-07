import mongoose, {Schema, Document} from 'mongoose';
interface IStory extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    topic?: string;
    sentences: string[];
    storyKey: string;
    invitedFriends: string[]; // Store user IDs or usernames
    isComplete: boolean;
}

const storySchema: Schema = new Schema({
    title: { type: String, required: true },
    topic: { type: String },
    sentences: { type: [String], default: [] },
    storyKey: { type: String, unique: true },
    invitedFriends: { type: [String], default: [] },
    isComplete: { type: Boolean , default: false},
});

const Story = mongoose.model<IStory>('Story', storySchema);
export default Story;
