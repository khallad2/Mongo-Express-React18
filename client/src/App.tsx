import React, {useState} from 'react';
import Create from './components/story/Create.tsx';
import './app.css';
import Update from "./components/story/Update.tsx";

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
                {isCreateFormVisible && <Create />}
            </div>


            <div className={`form-container ${isInteractionStoryFormVisible ? 'visible' : 'hidden'}`}>
                {isInteractionStoryFormVisible && <Update />}
            </div>
            {/*<Outlet></Outlet>*/}

        </div>
    );
};

export default App;
