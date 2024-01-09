import React, { useState } from 'react';
import './Create.css';
import IStoryForm from '../../../interfaces/IStoryForm.tsx';

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

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback('');

        // Custom validation logic
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            setIsValidInput(false);
            newErrors.title = 'Title is required';
            setFeedback('Title is required');
            setFeedbackType('error');
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
                    console.log(result);
                    // Handle success or error messages as needed
                    if (result.success === true) {
                        setFeedback('Story created successfully, Join Story to add a sentence!');
                        setFeedbackType('success');
                        setStoryLink(result.data.link)
                    } else {
                        setFeedback('Error creating story. Please try again.');
                        setFeedbackType('error');
                        setStoryLink('')
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
                    <div>
                        <h3 id="form-title" className="form-title">New Story</h3>
                        <form id="create-form" onSubmit={handleSubmit}>
                            <div id="title-group" className="form-group">
                                <input
                                    id="title-input"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`create-form-input ${isValidInput ? '' : 'invalid'}`}
                                    placeholder={'Title*'}
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
                                    placeholder={'Topic'}
                                />
                            </div>

                            <button id="submit-button" type="submit" className="form-button">
                                Create Story
                            </button>

                            {storyLink && (
                                <div id="success-feedback" className="success-feedback">
                                    <label>Story link to share with friends</label>
                                        <a href={storyLink} target='_blank' className="story-link">{storyLink}</a>
                                </div>
                            )}
                            {feedback && (
                                <p
                                    id="feedback-message"
                                    className={`feedback-message ${feedbackType === 'success' ? 'success-feedback' : 'error-feedback'}`}
                                >
                                    {feedback}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Create;
