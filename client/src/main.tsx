import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Create from "./components/story/Create.tsx";
import Update from "./components/story/Update.tsx";
import {StrictMode} from "react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/create' element={<Create />}></Route>
                <Route path='/join' element={<Update />} ></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
