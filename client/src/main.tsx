import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import CreateStoryForm from "./components/story/CreateStoryForm.tsx";
import StoryInteraction from "./components/story/StoryInteraction.tsx";
import AboutComponent from "./components/story/about.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/about' element={<AboutComponent />}></Route>
            <Route path='/create' element={<CreateStoryForm />}></Route>
            <Route path='/join' element={<StoryInteraction />}></Route>
        </Routes>
    </BrowserRouter>
)
