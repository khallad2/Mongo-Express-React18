import React, {useState, ChangeEvent, FormEvent} from 'react';
import './Create.css';
import IStoryForm from '../../../interfaces/IStoryForm.tsx';
import InfoCircle from "../../common/InfoCircle/InfoCircle.tsx";

/**
 * @fileoverview Create component for creating a new story.
 * @component
 * @returns {JSX.Element} Rendered Create component.
 */
const Create: React.FC = () => {

    // State for form data
    const [formData, setFormData] = useState<IStoryForm>({
        title: '',
        topic: '',
    });
    const [storyLink, setStoryLink] = useState<string>('');

    // State for feedback messages
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>();

    // State for input validation
    const [isValidInput, setIsValidInput] = useState<boolean>(true);

    /**
     * Handle input changes.
     * @param {ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handle form submission.
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Custom validation logic
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            setIsValidInput(false);
            newErrors.title = 'Title is required';
            setFeedback('Title is required');
            setFeedbackType('error');
            setStoryLink('');
        }

        // If there are no errors, proceed with the submission
        if (Object.keys(newErrors).length === 0) {
            setIsValidInput(true);
            setFeedback('');

            // Implement logic to send a POST request to the backend
            fetch(`${import.meta.env.VITE_SERVER_URL}/stories/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((result) => {
                    // Handle success or error messages as needed
                    if (result.success === true) {
                        setFeedback('Story created successfully! Add a sentence or share with others!');
                        setFeedbackType('success');
                        setStoryLink(result.data.link);
                        setFormData({title: '', topic: ''})
                    } else {
                        setFeedback('Error creating story. Please try again.');
                        setFeedbackType('error');
                        setStoryLink('');
                    }
                })
                .catch((error) => {
                    console.error('Error creating story:', error);
                    setFeedback('Error creating story. Please try again.');
                    setFeedbackType('error');
                });
        }
    };

    return (
        <div id="create-card" className="create-card">
            <div id="create-card-content" className="create-card-content">
                    <h3 id="form-title" className="form-title">Create New Story</h3>
                    <div className="form-description">
                        Create and join stories!
                        Enter Story Title and Topic then Share or add your sentence.
                    </div>
                        <form id="create-form" onSubmit={handleSubmit}>
                            {!storyLink && (
                                <div>
                                    <div id="title-group" className="form-group">
                                        <input
                                            id="title-input"
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className={`create-form-input ${isValidInput ? '' : 'invalid'}`}
                                            placeholder={'Add Title*'}
                                        />
                                    </div>

                                    <div id="topic-group" className="form-group">
                                        <input
                                            id="topic-input"
                                            type="text"
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleInputChange}
                                            className="create-form-input"
                                            placeholder={'Add Topic'}
                                        />
                                    </div>
                                </div>
                            )}
                        {feedback && (
                            <div
                                id="feedback-message"
                                className={`create-feedback-message ${feedbackType === 'success' ? 'success-feedback' : 'error-feedback'}`}
                            >
                                {feedback}
                            </div>
                        )}

                        <div className='create-col'>
                        {storyLink !== '' && (
                            <div className='create-row'>
                                {storyLink &&(
                                    <div className='form-group'>
                                        {/*<span>Copy link to share</span>*/}
                                        <InfoCircle  title={'Share'} description={storyLink}/>
                                    </div>
                                )}
                                <button className="share-sentence-button">
                                    <a href={storyLink} target='_blank' rel='noopener noreferrer' >Add Sentence or Share with others
                                    </a>
                                </button>
                            </div>

                        )}

                        <button id="submit-button" type="submit" className="submit-button">
                            {formData.title !== '' ? 'Submit' : 'Create New Story'}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Create;
