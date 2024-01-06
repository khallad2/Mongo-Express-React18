// src/App.tsx
import React, { useState } from 'react';
import CreateStoryForm from './components/CreateStoryForm';
import './app.css';

const App: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">One Line Story Game</h1>
            <button className="toggle-form-button" onClick={toggleFormVisibility}>
                {isFormVisible ? '' : 'Get Started'}
            </button>
            <div className={`form-container ${isFormVisible ? 'visible' : 'hidden'}`}>
                <CreateStoryForm />
            </div>
        </div>
    );
};

export default App;
