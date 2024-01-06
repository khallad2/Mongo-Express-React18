import React, { useState } from 'react';
import './CreateStoryForm.css';

interface StoryForm {
    title: string;
    topic?: string;
}

const CreateStoryForm: React.FC = () => {
    const [formData, setFormData] = useState<StoryForm>({
        title: '',
        topic: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Custom validation logic
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        setErrors(newErrors);

        // If there are no errors, proceed with the submission
        if (Object.keys(newErrors).length === 0) {
            // Implement logic to send a POST request to the backend
            fetch(import.meta.env.VITE_SERVER_URL + '/stories/create', {
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
                })
                .catch((error) => {
                    console.error('Error creating story:', error);
                });
        }
    };

    return (
        <div className="card">
            <div className="create-card-content">
                <h3 className="form-title">Start New Story</h3>
                <form onSubmit={handleSubmit} className="story-form">
                    <div className="form-group">
                        {/*<label className="form-label">Title:</label>*/}
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`create-form-input ${errors.title ? 'invalid' : ''}`}
                            placeholder={'Title*'}
                        />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="create-form-input"
                            placeholder={'Topic'}
                        />
                    </div>

                    <button type="submit" className="form-button">
                        Create Story
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateStoryForm;
