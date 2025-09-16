import './App.css'
import Page from "./components/Page.jsx";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import About from "./components/About.jsx";

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
                    </ul>
                </nav>
                <Routes>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/" element={<Page/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
