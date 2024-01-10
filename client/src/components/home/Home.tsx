import React, { useState } from 'react';
import './Home.css';
import Update from "../story/update/Update.tsx";
import Create from "../story/create/Create.tsx";
import * as icon from '../../assets/expand-icon.svg';
/**
 * @fileoverview Home component representing the main page of the One Line Story application.
 * @Component
 * @returns {JSX.Element} Rendered Home component.
 */
const Home: React.FC = () => {
    const [isCreateComponentVisible, setIsCreateComponentVisible] = useState(false);
    const [isUpdateComponentVisible, setIsUpdateComponentVisible] = useState(false);

    /**
     * Toggles the visibility of the Create Story Form.
     */
    const toggleCreateStoryFormVisibility = () => {
        setIsCreateComponentVisible(!isCreateComponentVisible);
        setIsUpdateComponentVisible(false);
    };

    /**
     * Toggles the visibility of the Interaction Story Form.
     */
    const toggleInteractionStoryFormVisibility = () => {
        setIsUpdateComponentVisible(!isUpdateComponentVisible);
        setIsCreateComponentVisible(false);
    };

    return (
        <div>
        <div className="app-container">
            <h1 className="app-title">One Line Story </h1>
            <div className="app-description">
                Welcome to One Line Story, where you can create and join stories with just one line!
                Explore your creativity and contribute to exciting narratives.
            </div>
            <div className="row">
                <div className="form-container-wrapper">
                    <button className="toggle-form-button" onClick={toggleCreateStoryFormVisibility}>
                        {isCreateComponentVisible ? <img alt="Icon" src={icon.default} className="icon-svg"></img> : 'Create Story'}
                    </button>
                    <button className="toggle-form-button" onClick={toggleInteractionStoryFormVisibility}>
                        {isUpdateComponentVisible ? <img alt="Icon" src={icon.default} className="icon-svg"></img>  : 'Join Story'}
                    </button>
                </div>
            </div>

            <div className={`form-container ${isCreateComponentVisible ? 'visible' : 'hidden'}`}>
                {isCreateComponentVisible && <Create />}
            </div>

            <div className={`form-container ${isUpdateComponentVisible ? 'visible' : 'hidden'}`}>
                {isUpdateComponentVisible && <Update />}
            </div>
        </div>
        </div>
    );
};

export default Home;
