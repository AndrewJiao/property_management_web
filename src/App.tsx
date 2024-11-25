import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./page";


function App() {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={HomePage}/>
                    <Route path="/:tableType" Component={HomePage}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
