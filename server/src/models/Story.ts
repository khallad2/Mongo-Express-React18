import mongoose, {Schema, Document} from 'mongoose';
interface IStory extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    topic?: string;
    sentences: string[];
    invitedFriends: string[]; // Store user IDs or usernames
    isComplete: boolean;
    link: string;
}

const storySchema: Schema = new Schema({
    title: { type: String, required: true },
    topic: { type: String, default: '' },
    sentences: { type: [String], default: [] },
    invitedFriends: { type: [String], default: [] },
    isComplete: { type: Boolean , default: false},
    link: {type: String, unique: true}
});

const Story = mongoose.model<IStory>('Story', storySchema);
export default Story;
