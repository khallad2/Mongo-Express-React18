import React, { useState, useEffect } from 'react';
import './StoryInteraction.css';
import IStory from '../../interfaces/IStory.ts';
const StoryInteraction: React.FC = () => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [selectedStory, setSelectedStory] = useState<string>('');
    const [previousSentence, setPreviousSentence] = useState<string>('');
    const [newSentence, setNewSentence] = useState<string>('');
    const [isValidInput, setIsValidInput] = useState<boolean>(true);
    const [showNarrative, setShowNarrative] = useState<boolean>(false); // Added state for showing narrative

    useEffect(() => {
        // Fetch the list of stories from the backend when the component mounts
        fetch(import.meta.env.VITE_SERVER_URL + '/stories/all')
            .then((response) => response.json())
            .then((res) => setStories(res.data.stories))
            .catch((error) => console.error('Error fetching stories:', error));
    }, []);
    const handleStorySelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStory = event.target.value;
        setSelectedStory(selectedStory);
        // Fetch the previous sentence for the selected story
        fetch(import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory}/previous-sentence`)
            .then((response) => response.json())
            .then((res) => setPreviousSentence(res.data.previousSentence))
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
            const response = await fetch(
                import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory}/add-sentence`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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
    const handleViewNarrative = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowNarrative(!showNarrative);
    };
    const getAllSentences = () => {
        const selectedStoryObj = stories.find((story) => story._id === selectedStory);
        return selectedStoryObj?.sentences.join(' ') || '';
    };
    return (
        <div className="card">
            <div className="interaction-card-content">
                <h3 className="sentence-title">Join Story</h3>
                <select className='select-form-input' value={selectedStory} onChange={handleStorySelectionChange}>
                    <option value="">Available open stories</option>
                    {stories.map((story) => (
                        <option key={story._id} value={story._id}>
                            {story.title}
                        </option>
                    ))}
                </select>
                {selectedStory && (
                        <form onSubmit={handleSentenceSubmit} >
                            <textarea
                                value={newSentence}
                                onChange={(e) => {
                                    setNewSentence(e.target.value);
                                    setIsValidInput(true);
                                }}
                                className={`interaction-form-input ${isValidInput ? '' : 'invalid'}`}
                                placeholder={'Add Sentence'}
                            />
                            {!isValidInput && <p className="error-message">Input cannot be empty</p>}
                            <div >
                                <label>last Sentence</label>
                                <span className="hint-text"> {previousSentence || 'No Sentences'}</span>
                            </div>
                            <button type="submit" >Submit Sentence</button>
                            <button
                                className={showNarrative ? 'hide-button' : 'view-button'}
                                onClick={handleViewNarrative}
                            >
                                {showNarrative ? 'Hide Narrative' : 'View Narrative'}
                            </button>
                        </form>
                )}
            </div>
            {showNarrative && selectedStory && (
            <div className='hint-container'>
                {/* Use a dynamic className to set button color based on showNarrative state */}
                    <div className='hint-text'>
                        <p>{getAllSentences()}</p>
                    </div>
            </div>
            )}
        </div>
    );
};

export default StoryInteraction;
