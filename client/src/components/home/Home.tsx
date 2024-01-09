import React, { useState } from 'react';
import './Home.css';
import CreateStoryForm from '../story/create/Create.tsx';
import InteractionStoryForm from '../story/update/Update.tsx';

/**
 * @fileoverview Home component representing the main page of the One Line Story application.
 * @returns {JSX.Element} Rendered Home component.
 */
const Home: React.FC = () => {
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [isInteractionStoryFormVisible, setIsInteractionStoryFormVisible] = useState(false);

    /**
     * Toggles the visibility of the Create Story Form.
     */
    const toggleCreateStoryFormVisibility = () => {
        setIsCreateFormVisible(!isCreateFormVisible);
        setIsInteractionStoryFormVisible(false);
    };

    /**
     * Toggles the visibility of the Interaction Story Form.
     */
    const toggleInteractionStoryFormVisibility = () => {
        setIsInteractionStoryFormVisible(!isInteractionStoryFormVisible);
        setIsCreateFormVisible(false);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">One Line Story</h1>
            <div className="row">
                <div className="form-container-wrapper">
                    <button className="toggle-form-button" onClick={toggleCreateStoryFormVisibility}>
                        {isCreateFormVisible ? 'X' : 'Add Story'}
                    </button>
                    <button className="toggle-form-button" onClick={toggleInteractionStoryFormVisibility}>
                        {isInteractionStoryFormVisible ? 'X' : 'Join Story'}
                    </button>
                </div>
            </div>

            <div className={`form-container ${isCreateFormVisible ? 'visible' : 'hidden'}`}>
                {isCreateFormVisible && <CreateStoryForm />}
            </div>

            <div className={`form-container ${isInteractionStoryFormVisible ? 'visible' : 'hidden'}`}>
                {isInteractionStoryFormVisible && <InteractionStoryForm />}
            </div>
        </div>
    );
};

export default Home;
