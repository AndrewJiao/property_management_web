import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {HomePage, LoginPage} from "./page";
import {useSelector} from "./redux/hook";

const PrivateRoute = ({children}: any) => {
    let status = useSelector(e => e.authSlice);
    return status.isLogin ? children : <Navigate to={"/login"}/>;
}

function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <HomePage/>
                        </PrivateRoute>
                    }/>
                    <Route path="/:tableType" element={
                        <PrivateRoute>
                            <HomePage/>
                        </PrivateRoute>
                    }/>
                    <Route path={"/login"} Component={LoginPage}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
