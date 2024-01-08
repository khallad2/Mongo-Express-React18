import React, { useState, useEffect } from 'react';
import './Update.css';
import IStory from '../../interfaces/IStory';
import ErrorBoundary from '../common/ErrorBoundry.tsx';

interface UpdateProps {}

const Update: React.FC<UpdateProps> = () => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [selectedStory, setSelectedStory] = useState<IStory | null>(null);
    const [previousSentence, setPreviousSentence] = useState<string>('');
    const [newSentence, setNewSentence] = useState<string>('');
    const [isValidInput, setIsValidInput] = useState<boolean>(true);
    const [showNarrative, setShowNarrative] = useState<boolean>(false);
    const [isStoryCompleted, setIsStoryCompleted] = useState<boolean>(false);
    const [storyLink, setStoryLink] = useState<string>('');
    const [feedbackMessage, setFeedbackMessage] = useState<string>(''); // New state for feedback message
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>(); // New state for feedback type

    useEffect(() => {
        fetchAllStories();
    }, []);

    const fetchAllStories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stories/all`);
            const data = await response.json();
            setStories(data.data.stories);
        } catch (error) {
            console.error('Error fetching stories:', error);
            setFeedbackMessage('Failed to load stories'); // Feedback message for error
        }
    };

    const handleStorySelectionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStoryId = event.target.value;
        const selectedStoryObject = stories.find((story) => story._id === selectedStoryId) || null;

        setIsStoryCompleted(selectedStoryObject?.isComplete || false);
        setSelectedStory(selectedStoryObject);
        setStoryLink(selectedStoryObject?.link || '');

        if (selectedStoryObject) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stories/${selectedStoryId}/previous-sentence`);
                const data = await response.json();
                setPreviousSentence(data.data.previousSentence || '');
            } catch (error) {
                console.error('Error fetching previous sentence:', error);
                setFeedbackMessage('Failed to load previous sentence'); // Feedback message for error
            }
        } else {
            setPreviousSentence('');
        }
    };

    const handleSentenceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newSentence.trim()) {
            setIsValidInput(false);
            setFeedbackMessage('Enter valid sentence');
            setFeedbackType('error');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stories/${selectedStory?._id}/add-sentence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newSentence }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit sentence');
            }

            const res = await response.json();
            setPreviousSentence(res.data.previousSentence);
            setNewSentence('');
            setIsValidInput(true);

            setSelectedStory((prevStory) => ({
                ...(prevStory as IStory),
                sentences: [...prevStory?.sentences || [], res.data.previousSentence],
            }));

            setFeedbackMessage('Sentence submitted successfully'); // Feedback message for success
            setFeedbackType('success');

            // Fetch new stories after entering a sentence
            fetchAllStories();
        } catch (error) {
            console.error('Error submitting sentence:', error);
            setFeedbackMessage('Failed to submit sentence'); // Feedback message for error
            setFeedbackType('error');
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

    const handleEndStory = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (selectedStory?.sentences.length === 0) {
            // End story button only visible when selectedStory has at least one sentence
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stories/${selectedStory?._id}/end`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to end story');
            }

            const data = await response.json();
            console.log('Completed Story:', data);
            setIsStoryCompleted(true);
            fetchAllStories();
            setFeedbackMessage('Story is completed successfully'); // Feedback message for success
        } catch (error) {
            console.error('Error ending story:', error);
            setIsStoryCompleted(false);
            setFeedbackMessage('Failed to end story'); // Feedback message for error
        }
    };

    return (
        <ErrorBoundary>
            <div className="interaction-card">
                <div className="interaction-card-content">
                    <h3 className="sentence-title">Join Story</h3>
                    <select className="select-form-input" value={selectedStory?._id} onChange={handleStorySelectionChange}>
                        <option value="">Select Stories</option>
                        {stories.map((story) => (
                            <option key={story._id} value={story._id}>
                                {story.title} {story.isComplete && '  - Completed'}
                            </option>
                        ))}
                    </select>
                    {selectedStory && (
                        <form onSubmit={handleSentenceSubmit}>
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
                            {/*{!isValidInput && <p className="error-message">Enter a valid sentence</p>}*/}
                            <div>
                                <label>Last Sentence</label>
                                <span className="hint-text"> {previousSentence || 'No Sentences'}</span>
                            </div>
                            <button className={isStoryCompleted ? 'disabled' : 'end-button'} type="submit" disabled={isStoryCompleted}>
                                Submit Sentence
                            </button>
                            {selectedStory.sentences.length !== 0 && (
                                <button
                                    className={isStoryCompleted ? 'disabled' : 'end-button'}
                                    onClick={handleEndStory}
                                    disabled={isStoryCompleted}
                                >
                                    End Story
                                </button>
                            )}
                            {isStoryCompleted && (
                                <button className={showNarrative ? 'hide-button' : 'view-button'} onClick={handleViewNarrative}>
                                    {showNarrative ? 'Hide Narrative' : 'Reveal Narrative'}
                                </button>
                            )}
                        </form>
                    )}
                </div>

                {showNarrative && selectedStory && isStoryCompleted && (
                    <div>
                        <div className="hint-container">
                            <label>Story link to share with friends</label>
                            {storyLink}
                        </div>
                        <div className="hint-container">
                            <h3>{selectedStory.title}</h3>
                            <div className="hint-text">
                                <p>{getAllSentences()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Display feedback message with appropriate style */}
                {feedbackMessage && (
                    <div className={`feedback-message ${feedbackType === 'success' ? 'success-feedback' : 'error-feedback'}`}>
                        {feedbackMessage}
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default Update;
