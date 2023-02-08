import React, {useContext} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {Navigate} from 'react-router-dom';
const AppRouter = () => {
   const {user}=useContext(Context)
    console.log(user)
    return (

        <Routes>
            {user.isAuth && authRoutes.map(({path,Component})=>
                <Route key={path} path={path}component={Component} exact/>
            )}
            {publicRoutes.map(({path,Component})=>
                <Route key={path} path={path}component={Component} exact/>
            )}

        </Routes>

    );
};

export default AppRouter;