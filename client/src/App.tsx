import React from 'react';
import './app.css';
import Update from './components/story/update/Update';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';

/**
 * @fileoverview The root component of the React application.
 * @component
 * @returns {React.ReactNode} The rendered React node.
 */
const App: React.FC = () => {
    return (
        <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />

            {/* Join route */}
            <Route path="/join" element={<Update />} />
        </Routes>
    );
};

export default App;

