import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ServicesStore from "./store/ServicesStore";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "react-bootstrap/NavBar";
import NavBar from "./components/NavBar";


export const Context=createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


    <Context.Provider value={{
        user:new UserStore(),
        services:new ServicesStore()
    }}>


        <App />
    </Context.Provider>


);

