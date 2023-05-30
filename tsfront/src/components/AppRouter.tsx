import React, {useContext} from 'react';
import {authRoutes, publicRoutes} from "../routes";
import {Route,Routes} from "react-router-dom";
import {Context} from "../index";




const AppRouter = () => {

    const {user}=useContext(Context)

    return (
        <Routes>
            <>
            {user.isAuth && authRoutes.map(({path,Component})=>{
               return <Route key={path} path={path} element={<Component/>} />
            })}
            {publicRoutes.map(({path,Component})=>{
                return  <Route key={path} path={path}  element={<Component/>} />

            })}
            </>
        </Routes>
    );
};

export default AppRouter;