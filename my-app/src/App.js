import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, SERVICES_ROUTE, STAFF_ROUTE} from "./utils/consts";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import ServicesPage from "./pages/ServicesPage";
import Admin from "./pages/Admin";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import StaffPage from "./pages/StaffPage";




const App = observer(() => {
    const {user}=useContext(Context)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{

    },[])
  return (

    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
    <Routes>
        <Route path={ADMIN_ROUTE} element={<Admin/>}></Route>
        <Route path={MAIN_ROUTE} element={<Main/>}></Route>
        <Route path={LOGIN_ROUTE} element={<Auth/>}></Route>
        <Route path={REGISTRATION_ROUTE} element={<Auth/>}></Route>
        <Route path={SERVICES_ROUTE+'/:id'} element={<ServicesPage/>}></Route>
        <Route path={STAFF_ROUTE+'/:id'} element={<StaffPage/>}></Route>
     </Routes>
    </BrowserRouter>


  );
})

export default App;
