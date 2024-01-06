import React, { useState } from 'react';
import CreateStoryForm from './components/story/CreateStoryForm.tsx';
import './app.css';
import StoryInteraction from "./components/story/StoryInteraction.tsx";

const App: React.FC = () => {
    const [isCreateFormVisible, setIsFormVisible] = useState(false);
    const [isInteractionStoryFormVisible, setInteractionStoryFormVisible] = useState(false);
    const toggleInteractionStoryFormVisibility = () => {
        setInteractionStoryFormVisible(!isInteractionStoryFormVisible);
        setIsFormVisible(false);
    };

    const toggleCreateStoryFormVisibility = () => {
        setIsFormVisible(!isCreateFormVisible);
        setInteractionStoryFormVisible(false)
    };

    return (
        <div className="app-container">
            <h1 className="app-title">One Line Story</h1>
            <div className="row">
                <div className="form-container-wrapper">
                    <button className="toggle-form-button" onClick={toggleCreateStoryFormVisibility}>
                        {isCreateFormVisible ? 'Hide' : 'Add Story'}
                    </button>
                    <button className="toggle-form-button" onClick={toggleInteractionStoryFormVisibility}>
                        {isInteractionStoryFormVisible ? 'Hide' : 'Join Story'}
                    </button>
                </div>
            </div>

            <div className={`form-container ${isCreateFormVisible ? 'visible' : 'hidden'}`}>
                {isCreateFormVisible && <CreateStoryForm />}
            </div>

            <div className={`form-container ${isInteractionStoryFormVisible ? 'visible' : 'hidden'}`}>
                {isInteractionStoryFormVisible && <StoryInteraction />}
            </div>
        </div>
    );
};

export default App;
