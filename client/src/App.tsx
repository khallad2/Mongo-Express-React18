// src/App.tsx
import React from 'react';
import CreateStoryForm from './components/CreateStoryForm';

const App: React.FC = () => {
    return (
        <div>
            <h1>One Line Story Game</h1>
            <CreateStoryForm />
            {/* Add other components or features as needed */}
        </div>
    );
};

export default App;
