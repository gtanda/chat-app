import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import IndexPage from "./IndexPage/IndexPage";
import HomePage from "./HomePage";
import PrivateRoutes from "./PrivateRoutes";

const Views = () => {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<IndexPage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path={"/home"} element={<HomePage />} />
                </Route>
                <Route path={"/*"} element={<IndexPage />} />
            </Routes>
        </Router>
    );
};

export default Views;
