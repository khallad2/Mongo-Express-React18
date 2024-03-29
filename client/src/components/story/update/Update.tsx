import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import InfoCircle from '../../common/InfoCircle/InfoCircle.tsx';
import IStory from '../../../interfaces/IStory.tsx';
import { useLocation } from 'react-router-dom';
import './Update.css';

interface UpdateProps {}

/**
 * @fileoverview Update component for joining and updating a story.
 * @component
 * @returns {JSX.Element} Rendered Update component.
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
    const [isInvitation, setIsInvitation] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        fetchAllStories()
            .then((response) => {
                setStories(response.data.stories);
                const fullUrl = window.location.origin + window.location.pathname + window.location.hash;
                const storyKey = location.hash.slice(1);
                // if storyKey and fullUrl handle url mount
                storyKey !== '' && fullUrl.includes(storyKey) ? handleMount(response.data.stories, fullUrl) : setIsInvitation(false);
            });
        return () => {}
    }, []);

    /**
     * Handle mounting of the component in case of provided story link.
     */
    const handleMount =  (stories: IStory[], fullUrl: string) => {
        try {
            const selected = stories.find((story) => story.link === fullUrl);
            selectStory(selected?._id || '', stories);
            setIsInvitation(true);
        } catch (error) {
            setIsInvitation(false);
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
    const selectStory =  (selectedStoryId: string, stories: IStory[]) => {
        const selectedStoryObject =  stories.find((story) => story._id === selectedStoryId) || null;
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
        const res = await fetchAllStories();
        setStories(res.data.stories);
        selectStory(selectedStoryId, stories);
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
                sentences: [...res.data.allSentences],
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
            setFeedbackMessage('Story can not be ended!! because it has no sentences yet');
            setFeedbackType('error');
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/stories/${selectedStory?._id}/end`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to end story');
            }

            await response.json();
            setIsStoryCompleted(true);
            setFeedbackMessage('Story is completed successfully, Now you can Reveal Narrative'); // Feedback message for success
            setFeedbackType('success');
        } catch (error) {
            console.error('Error ending story:', error);
            setIsStoryCompleted(false);
            setFeedbackMessage('Failed to end story'); // Feedback message for error
            setFeedbackType('error');
        }
    };
    return (
        <div id="update-card" className="update-card">
            {isInvitation && (
                <div>
                    <Link to='/'>  {'<- Home'} </Link>
                </div>
            )}
            <div id="update-card-content" className='update-card-content'>
                <h3 id="sentence-title" className="sentence-title">Join Existing Story</h3>
                <div className="update-form-description ">
                    {!isInvitation && (
                        <div >Join an open story to contribute by adding a new sentence.
                            Or reveal the narrative of a completed story and share with others.
                        </div>
                    )}

                    {isInvitation && isStoryCompleted &&(
                        <div >You are invited to only view this completed story.
                            Now you can reveal whole narrative and Share with others!.
                        </div>
                    )}
                    {isInvitation && !isStoryCompleted &&(
                        <div >You are invited to Join only this open story.
                            Add sentence and share with others!.
                        </div>
                    )}
                </div>

                {/* Display feedback message with appropriate style */}
                {isStoryCompleted &&(
                    <div id="story-complete-message" className="success-feedback">
                        This story is completed, Reveal Narrative now!
                    </div>
                )}

                <select
                    id="select-form-input"
                    className="select-form-input"
                    value={selectedStory?._id}
                    onChange={handleStorySelectionChange}
                >
                    <option value="">Select open Story</option>
                    {stories.map((story) => (
                        <option
                            key={story._id}
                            value={story._id}
                            disabled={story._id !== selectedStory?._id && isInvitation}
                        >
                            {story.title} {story.isComplete && '  - Completed'}
                        </option>
                    ))}
                </select>

                {/* Display Form when selecting an open story with appropriate style */}
                {selectedStory && !isStoryCompleted &&(
                    <form id="update-form" onSubmit={handleSentenceSubmit} className='update-form'>
                        <textarea
                            id="interaction-form-input"
                            value={newSentence}
                            onChange={handleSentenceChange}
                            className={`interaction-form-input ${isValidInput ? 'interaction-form-input' : 'interaction-form-input invalid'}`}
                            placeholder={'Add Sentence'}
                            disabled={isStoryCompleted}
                        />
                            <label id="last-sentence-label">Last Sentence</label>
                            <input disabled={true} className={'interaction-form-input'} id="hint-text" value={previousSentence || 'No Sentences yet ... '}></input>

                        {/* Display feedback message with appropriate style */}
                        {feedbackMessage && (
                            <div
                                id="feedback-message"
                                className={`feedback-message ${feedbackType === 'success' ? 'success-feedback' : 'error-feedback'}`}
                            >
                                {feedbackMessage}
                            </div>
                        )}

                        <div className='update-row '>
                            <button
                                id="submit-button"
                                className={isStoryCompleted ? 'disabled' : 'end-button'}
                                type="submit"
                                disabled={isStoryCompleted}
                            >
                                Submit Sentence
                            </button>
                            {selectedStory && !isStoryCompleted &&(
                                <div className='update-row '>
                                    <button
                                        id="end-button"
                                        className={isStoryCompleted ? 'disabled' : 'end-button'}
                                        onClick={handleEndStory}
                                        disabled={isStoryCompleted}
                                    >
                                        End Story
                                    </button>
                                    <div>
                                        <div>
                                            <InfoCircle title={'share'} description={storyLink}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>
            {showNarrative && selectedStory && isStoryCompleted && (
                <div id="narrative-container" className={`update-hint-container ${showNarrative ? 'fade-in' : ''}`}>
                    <h3 id="story-title">{selectedStory.title}</h3>
                    <div id="hint-text" className="hint-text">
                        {selectedStory.sentences.join('\n')}
                    </div>
                </div>
            )}

            <div className='update-row'>
                {isStoryCompleted && (
                    <button
                        id="view-button"
                        className={showNarrative ? 'hide-button' : 'view-button'}
                        onClick={handleViewNarrative}
                    >
                        {showNarrative ? 'Hide Narrative' : 'Reveal Narrative'}
                    </button>
                )}
                {selectedStory && isStoryCompleted &&(
                    <div>
                        <div>
                            <InfoCircle title={'share'} description={storyLink}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Update;
