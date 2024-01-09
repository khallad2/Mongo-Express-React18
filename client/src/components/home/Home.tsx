import React, {useState} from 'react';
import Create from '../story/Create.tsx';
import './home.css';
import Update from "../story/Update.tsx";

const Home: React.FC = () => {

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
                        {isCreateFormVisible ? 'X' : 'Add Story'}
                    </button>
                    <button className="toggle-form-button" onClick={toggleInteractionStoryFormVisibility}>
                        {isInteractionStoryFormVisible ? 'X' : 'Join Story'}
                    </button>
                </div>
            </div>

            <div className={`form-container ${isCreateFormVisible ? 'visible' : 'hidden'}`}>
                {isCreateFormVisible && <Create />}
            </div>


            <div className={`form-container ${isInteractionStoryFormVisible ? 'visible' : 'hidden'}`}>
                {isInteractionStoryFormVisible && <Update />}
            </div>
            {/*<Outlet></Outlet>*/}

        </div>
    );
};

export default Home;
