import React, { useState, useEffect } from 'react';
import './StoryInteraction.css';
import IStory from '../../interfaces/IStory.ts';

const StoryInteraction: React.FC = () => {
    const [stories, setStories] = useState<IStory[]>([]);
    // const [selectedStory, setSelectedStory] = useState<IStory>('');
    const [selectedStory, setSelectedStory] = useState<IStory | null>(null);
    const [previousSentence, setPreviousSentence] = useState<string>('');
    const [newSentence, setNewSentence] = useState<string>('');
    const [isValidInput, setIsValidInput] = useState<boolean>(true);
    const [showNarrative, setShowNarrative] = useState<boolean>(false); // Added state for showing narrative
    const [isStoryCompleted, setIsStoryCompleted] = useState<boolean>(false);
    useEffect(() => {
        // Fetch the list of stories from the backend when the component mounts
        fetchAllStories();
    }, []);

    const fetchAllStories = () => {
        // Fetch the list of stories from the backend
        fetch(`${import.meta.env.VITE_SERVER_URL}/stories/all`)
            .then((response) => response.json())
            .then((res) => setStories(res.data.stories))
            .catch((error) => console.error('Error fetching stories:', error));
    };
    const handleStorySelectionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStoryId = event.target.value;
        const selectedStoryObject = stories.find((story) => story._id === selectedStoryId) || null;
        const completed = selectedStoryObject?.isComplete || false;
        setIsStoryCompleted(completed);
        setSelectedStory(selectedStoryObject);
        if (selectedStoryObject) {
            // Fetch the previous sentence for the selected story
            await fetch(import.meta.env.VITE_SERVER_URL + `/stories/${selectedStoryId}/previous-sentence`)
                .then((response) => response.json())
                .then((res) => {setPreviousSentence(res.data.previousSentence);})
                .catch((error) => console.error('Error fetching previous sentence:', error));
        } else {
            setPreviousSentence(''); // Set to an empty string if no story is selected
        }
    };
    const handleSentenceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const selectedStoryId = selectedStory._id;
        if (!newSentence.trim()) {
            setIsValidInput(false);
            return;
        }

        // Submit the new sentence to the backend
        try {
            const response = await fetch(
                import.meta.env.VITE_SERVER_URL + `/stories/${selectedStory?._id}/add-sentence`, {
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
            // Get all new inserted sentences
            getAllSentences();
        } catch (error) {
            console.error('Error submitting sentence:', error);
        }
    };
    const handleViewNarrative = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowNarrative(!showNarrative);
    };
    const getAllSentences = () => {
        const selectedStoryObj = stories.find((story) => story._id === selectedStory?._id);
        return selectedStoryObj?.sentences.join(' ') || '';
    };

    const handleEndStory = (e: React.FormEvent<HTMLButtonElement>) => {
        const selectedStoryId = selectedStory?._id
        e.preventDefault();
        // Call the backend API to end the story
        fetch(`${import.meta.env.VITE_SERVER_URL}/stories/${selectedStoryId}/end`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the completed story data as needed
                console.log('Completed Story:', data);
                setIsStoryCompleted(true);
                fetchAllStories();
            })
            .catch((error) => {
                console.error('Error ending story:', error);
                setIsStoryCompleted(false);
            });
    };
    return (
        <div className="card">
            <div className="interaction-card-content">
                <h3 className="sentence-title">Join Story</h3>
                <select className='select-form-input' value={selectedStory?._id} onChange={handleStorySelectionChange}>
                    <option value="">Select Stories</option>
                    {stories.map((story) => (
                        <option key={story._id} value={story._id}  >
                            {story.title} {story.isComplete && '  - Completed'}
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
                                disabled={isStoryCompleted}
                            />
                            {!isValidInput && <p className="error-message">Input cannot be empty</p>}
                            <div >
                                <label>last Sentence</label>
                                <span className="hint-text"> {previousSentence || 'No Sentences'}</span>
                            </div>
                            {isStoryCompleted && (
                                <p className="completed-feedback">The story has been successfully completed!</p>
                            )}
                            <button className={isStoryCompleted ? 'disabled' : ''} type="submit" disabled={isStoryCompleted}>Submit Sentence</button>
                            <button
                                className={isStoryCompleted ? 'disabled' : ''}
                                onClick={handleEndStory} value={selectedStory._id}
                                disabled={isStoryCompleted}>End Story</button>
                            {isStoryCompleted && (
                                <button
                                    className={showNarrative ? 'hide-button' : 'view-button'}
                                    onClick={handleViewNarrative}
                                >
                                    {showNarrative ? 'Hide Narrative' : 'Reveal Narrative'}
                                </button>
                            )}
                        </form>
                )}
            </div>

            {showNarrative && selectedStory && (
            <div className='hint-container'>
                    <div className='hint-text'>
                        <p>{getAllSentences()}</p>
                    </div>
            </div>
            )}
        </div>
    );
};

export default StoryInteraction;
