import './App.css'
import Page from "./components/Page.jsx";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import About from "./components/About.jsx";
import Warum from "./components/Warum.jsx";

function App() {

    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/heavy">Heavy</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Page/>}/>
                    <Route path="/heavy" element={<Warum/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
