interface IStory extends Document {
    _id: string;
    title: string;
    topic?: string;
    sentences: string[],
}

export default IStory;
