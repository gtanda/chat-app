import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import IndexPage from "./IndexPage/IndexPage";
import HomePage from "./HomePage";
import PrivateRoutes from "./PrivateRoutes";
import authService from "../services/auth";
import { setLoggedIn, setUser } from "../reducers/indexPage";
import { useDispatch } from "react-redux";

const Views = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        authService
            .loginCheck()
            .then(res => {
                if (res.loggedIn) {
                    dispatch(setLoggedIn(true));
                    dispatch(setUser(res.user));
                    navigate("/home");
                }
            })
            .catch(err => {
                dispatch(setLoggedIn(false));
            });
    }, []);

    return (
        <Routes>
            <Route path={"/"} element={<IndexPage />} />
            <Route element={<PrivateRoutes />}>
                <Route path={"/home"} element={<HomePage />} />
            </Route>
            <Route path={"/*"} element={<IndexPage />} />
        </Routes>
    );
};

export default Views;
