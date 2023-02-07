import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import IndexPage from "./IndexPage";
import HomePage from "./HomePage";

const Views = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path={"/*"} element={<IndexPage/>}/>
            </Routes>
        </Router>
    )
}

export default Views;
