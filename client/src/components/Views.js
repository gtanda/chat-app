import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import IndexPage from "./IndexPage/IndexPage";
import HomePage from "./HomePage";
import Login from "./IndexPage/Login";
import Register from "./IndexPage/Register";

const Views = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path={"/*"} element={<IndexPage />} />
            </Routes>
        </Router>
    );
};

export default Views;
