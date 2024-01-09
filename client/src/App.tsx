import React from 'react';
import './app.css';
import Update from "./components/story/update/Update.tsx";
import { Route, Routes} from 'react-router-dom';
import Home from "./components/home/Home.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/join' element={<Update />} ></Route>
        </Routes>
    );
};

export default App;
