import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './Update.css';
import IStory from '../../../interfaces/IStory.tsx';
import { useLocation } from 'react-router-dom';

interface UpdateProps {
    stories?: IStory[]; // Assuming you receive stories as a prop
}

/**
 * Update component for joining and updating a story.
 */
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
    const [providedLocation, setProvidedLocation] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        fetchAllStories()
            .then((response) => {
                setStories(response.data.stories);
                handleMount();
            });
    }, [providedLocation]);

    /**
     * Handle mounting of the component.
     */
    const handleMount = async () => {
        try {
            const fullUrl = window.location.origin + window.location.pathname + window.location.hash;
            const storyKey = location.hash.slice(1);
            if (storyKey) {
                setProvidedLocation(storyKey);
                const selected = stories.find((story) => story.link === fullUrl);
                selectStory(selected?._id || '');
            } else {
                setProvidedLocation('');
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
            setFeedbackMessage('Failed to load stories');
        }
    };

    /**
     * Fetch all stories from the server.
     */
    const fetchAllStories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stories/all`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching stories:', error);
            setFeedbackMessage('Failed to load stories');
        }
    };

    /**
     * Select a story based on its ID.
     * @param {string} selectedStoryId - The ID of the selected story.
     */
    const selectStory = (selectedStoryId: string) => {
        const selectedStoryObject = stories.find((story) => story._id === selectedStoryId) || null;
        setIsStoryCompleted(selectedStoryObject?.isComplete || false);
        setSelectedStory(selectedStoryObject);
        setStoryLink(selectedStoryObject?.link || '');
        setShowNarrative(false);
        if (selectedStoryObject) {
            setFeedbackMessage('');
            setFeedbackType('success');
            const previousSentence = selectedStoryObject?.sentences[selectedStoryObject.sentences.length - 1] || '';
            setPreviousSentence(previousSentence);
        } else {
            setPreviousSentence('');
        }
    };

    /**
     * Handle the change of selected story in the dropdown.
     * @param {ChangeEvent<HTMLSelectElement>} event - The change event.
     */
    const handleStorySelectionChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedStoryId = event.target.value;
        selectStory(selectedStoryId);
    };

    /**
     * Handle the submission of a new sentence.
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSentenceSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newSentence.trim()) {
            setIsValidInput(false);
            setFeedbackMessage('Enter a valid sentence');
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
        } catch (error) {
            console.error('Error submitting sentence:', error);
            setFeedbackMessage('Failed to submit sentence'); // Feedback message for error
            setFeedbackType('error');
        }
    };

    /**
     * Handle the change of the new sentence input.
     * @param {ChangeEvent<HTMLTextAreaElement>} e - The change event.
     */
    const handleSentenceChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setNewSentence(e.target.value);
        setIsValidInput(true);
    };

    /**
     * Handle the button click to view/hide the narrative.
     * @param {FormEvent<HTMLButtonElement>} e - The button click event.
     */
    const handleViewNarrative = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowNarrative(!showNarrative);
    };

    /**
     * Handle the button click to end the story.
     * @param {FormEvent<HTMLButtonElement>} e - The button click event.
     */
    const handleEndStory = async (e: FormEvent<HTMLButtonElement>) => {
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
            setFeedbackMessage('Story is completed successfully'); // Feedback message for success
        } catch (error) {
            console.error('Error ending story:', error);
            setIsStoryCompleted(false);
            setFeedbackMessage('Failed to end story'); // Feedback message for error
        }
    };

    return (
        <div id="interaction-card" className="interaction-card">
            <div id="interaction-card-content" className="interaction-card-content">
                <h3 id="sentence-title" className="sentence-title">Join Story</h3>
                {/* Display feedback message with appropriate style */}
                {selectedStory?.isComplete && (
                    <div id="story-complete-message" className="success-feedback">
                        This story is completed
                    </div>
                )}

                {/* Display feedback message with appropriate style */}
                {feedbackMessage && (
                    <div
                        id="feedback-message"
                        className={`feedback-message ${feedbackType === 'success' ? 'success-feedback' : 'error-feedback'}`}
                    >
                        {feedbackMessage}
                    </div>
                )}

                <select
                    id="select-form-input"
                    className="select-form-input"
                    value={selectedStory?._id}
                    onChange={handleStorySelectionChange}
                >
                    <option value="">Select Stories</option>
                    {stories.map((story) => (
                        <option
                            key={story._id}
                            value={story._id}
                            disabled={story._id !== selectedStory?._id && providedLocation !== ''}
                        >
                            {story.title} {story.isComplete && '  - Completed'}
                        </option>
                    ))}
                </select>
                {selectedStory && (
                    <form id="update-form" onSubmit={handleSentenceSubmit}>
                        <textarea
                            id="interaction-form-input"
                            value={newSentence}
                            onChange={handleSentenceChange}
                            className={`interaction-form-input ${isValidInput ? '' : 'invalid'}`}
                            placeholder={'Add Sentence'}
                            disabled={isStoryCompleted}
                        />
                        <div>
                            <label id="last-sentence-label">Last Sentence</label>
                            <span id="hint-text" className="hint-text">
                                {previousSentence || 'No Sentences'}
                            </span>
                        </div>
                        <button
                            id="submit-button"
                            className={isStoryCompleted ? 'disabled' : 'end-button'}
                            type="submit"
                            disabled={isStoryCompleted}
                        >
                            Submit Sentence
                        </button>
                        {selectedStory.sentences.length !== 0 && (
                            <button
                                id="end-button"
                                className={isStoryCompleted ? 'disabled' : 'end-button'}
                                onClick={handleEndStory}
                                disabled={isStoryCompleted}
                            >
                                End Story
                            </button>
                        )}
                        {isStoryCompleted && (
                            <button
                                id="view-button"
                                className={showNarrative ? 'hide-button' : 'view-button'}
                                onClick={handleViewNarrative}
                            >
                                {showNarrative ? 'Hide Narrative' : 'Reveal Narrative'}
                            </button>
                        )}
                        {showNarrative && selectedStory && isStoryCompleted && (
                            <div id="narrative-container" className={`hint-container ${showNarrative ? 'fade-in' : ''}`}>
                                <h3 id="story-title">{selectedStory.title}</h3>
                                <span><a href={selectedStory.link} target='_blank' rel='noopener noreferrer'>share</a></span>
                                <div id="hint-text" className="hint-text">
                                    {selectedStory.sentences.join('\n')}
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
            {selectedStory && (
                <div id="success-feedback" className="success-feedback">
                    <label>Story link to share with friends</label>
                    <p id="story-link" className="story-link">
                        <a href={storyLink} target='_blank' rel='noopener noreferrer'>{storyLink}</a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Update;
