import React, { useState, useEffect } from 'react';
import './StoryInteraction.css';
import IStory from "../../interfaces/IStory.ts";
const StoryInteraction: React.FC = () => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [selectedStory, setSelectedStory] = useState<string>();
    const [previousSentence, setPreviousSentence] = useState<string>('');
    const [newSentence, setNewSentence] = useState<string>('');

    useEffect(() => {
        // Fetch the list of stories from the backend when the component mounts
        fetch(import.meta.env.VITE_SERVER_URL + '/stories/all')
            .then((response) => response.json())
            .then((data) => setStories(data))
            .catch((error) => console.error('Error fetching stories:', error));
    }, []);

    const handleStoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStory = event.target.value;

        setSelectedStory(selectedStory);
        // Fetch the previous sentence for the selected story
        fetch(import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory}/previous-sentence`)
            .then((response) => response.json())
            .then((data) => setPreviousSentence(data.data.previousSentence))
            .catch((error) => console.error('Error fetching previous sentence:', error));
    };

    const handleSentenceSubmit = () => {
        // Submit the new sentence to the backend
        fetch(import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory}/add-sentence`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newSentence }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the previous sentence and clear the input field
                setPreviousSentence(data.previousSentence);
                setNewSentence('');
            })
            .catch((error) => console.error('Error submitting sentence:', error));
    };

    return (
        <div>
            <h2>Story Interaction</h2>
            <label>Select a Story:</label>
            <select value={selectedStory} onChange={handleStoryChange}>
                <option value="">Select a story</option>
                {stories.map((story) => (
                    <option key={story._id} value={story._id}>
                        {story.title}
                    </option>
                ))}
            </select>

            {selectedStory && (
                <div>
                    <p>Previous Sentence: {previousSentence}</p>
                    <label>Add a Sentence:</label>
                    <input
                        type="text"
                        value={newSentence}
                        onChange={(e) => setNewSentence(e.target.value)}
                    />
                    <button onClick={handleSentenceSubmit}>Submit Sentence</button>
                </div>
            )}
        </div>
    );
};

export default StoryInteraction;
