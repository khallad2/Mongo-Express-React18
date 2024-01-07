interface IStory extends Document {
    _id: string;
    title: string;
    topic?: string;
    sentences: string[],
    invitedFriends: string[]; // array of emails
    isComplete: boolean,
    link: string;
}

export default IStory;
