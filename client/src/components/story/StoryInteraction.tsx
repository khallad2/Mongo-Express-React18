import React, { useState, useEffect } from 'react';
import './StoryInteraction.css';
import IStory from "../../interfaces/IStory.ts";

const StoryInteraction: React.FC = () => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [selectedStory, setSelectedStory] = useState<string>('');
    const [previousSentence, setPreviousSentence] = useState<string>('');
    const [newSentence, setNewSentence] = useState<string>('');
    const [isValidInput, setIsValidInput] = useState<boolean>(true);

    useEffect(() => {
        // Fetch the list of stories from the backend when the component mounts
        fetch(import.meta.env.VITE_SERVER_URL + '/stories/all')
            .then((response) => response.json())
            .then((data) => setStories(data))
            .catch((error) => console.error('Error fetching stories:', error));
    }, []);

    const handleStorySelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStory = event.target.value;
        setSelectedStory(selectedStory);
        // Fetch the previous sentence for the selected story
        fetch(import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory}/previous-sentence`)
            .then((response) => response.json())
            .then((data) => setPreviousSentence(data.data.previousSentence))
            .catch((error) => console.error('Error fetching previous sentence:', error));
    };

    const handleSentenceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newSentence.trim()) {
            setIsValidInput(false);
            return;
        }

        // Submit the new sentence to the backend
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory}/add-sentence`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newSentence }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit sentence');
            }

            const data = await response.json();
            // Update the previous sentence and clear the input field
            setPreviousSentence(data.data.previousSentence);
            setNewSentence('');
            setIsValidInput(true);
        } catch (error) {
            console.error('Error submitting sentence:', error);
        }
    };

    return (
        <div className="card form-container">
            <div className="interaction-card-content">
                <h3 className="sentence-title">Add to Story</h3>
                <select className='select-form-input' value={selectedStory} onChange={handleStorySelectionChange}>
                    <option value="">Select story</option>
                    {stories.map((story) => (
                        <option key={story._id} value={story._id}>
                            {story.title}
                        </option>
                    ))}
                </select>
                {selectedStory && (
                    <div>
                        <form onSubmit={handleSentenceSubmit}>
                            <input
                                type="text"
                                value={newSentence}
                                onChange={(e) => {
                                    setNewSentence(e.target.value);
                                    setIsValidInput(true);
                                }}
                                className={`create-form-input ${isValidInput ? '' : 'invalid'}`}
                                placeholder={'Add Sentence'}
                            />
                            {!isValidInput && <p className="error-message">Input cannot be empty</p>}
                            <div>
                                <div className="hint-container">
                                    <span className="hint-text">last Sentence: {previousSentence || 'No Sentences'}</span>
                                </div>
                            </div>
                            <button type="submit" >Submit Sentence</button>
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
};

export default StoryInteraction;
