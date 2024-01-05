// src/components/CreateStoryForm.tsx
import React, { useState } from 'react';
const CreateStoryForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [topic, setTopic] = useState<string>('');


    const handleCreateStory = () => {
        // Implement logic to send a POST request to the backend
        fetch( import.meta.env.VITE_SERVER_URL + '/api/stories/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, topic }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle success or error messages as needed
            })
            .catch((error) => {
                console.error('Error creating story:', error);
            });
    };

    return (
        <div>
            <h2>Create a New Story</h2>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Topic (optional):</label>
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />

            <button onClick={handleCreateStory}>Create Story</button>
        </div>
    );
};

export default CreateStoryForm;
