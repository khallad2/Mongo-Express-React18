import React, { useState } from 'react';
import CreateStoryForm from './components/story/CreateStoryForm.tsx';
import './app.css';
import StoryInteraction from "./components/story/StoryInteraction.tsx";

const App: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">One Line Story</h1>
            <button className="toggle-form-button" onClick={toggleFormVisibility}>
                {isFormVisible ? 'Hide' : 'Start Game'}
            </button>
            <div className="row">
                <div className="form-container-wrapper">
                    <div className={`form-container ${isFormVisible ? 'visible' : 'hidden'}`}>
                        <CreateStoryForm />
                    </div>
                    <div className={`form-container ${isFormVisible ? 'visible' : 'hidden'}`}>
                        <StoryInteraction />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
