import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import StaffPage from "./pages/StaffPage";
import {check, checkAuth} from "./http/userAPI";
import data from "bootstrap/js/src/dom/data";
import {Spinner} from "react-bootstrap";




const App = observer(() => {
    const {user}=useContext(Context)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(localStorage.getItem('token')){
            checkAuth().then(data=>{
                user.setUser(data)
                user.setIsAuth(true)
            }).finally(()=>setLoading(false))
        }

    },[])

    if(loading){
        return <Spinner animation={"grow"}/>
    }
  return (

    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
   {/* <Routes>
        <Route path={ADMIN_ROUTE} element={<Admin/>}></Route>
        <Route path={MAIN_ROUTE} element={<Main/>}></Route>
        <Route path={LOGIN_ROUTE} element={<Auth/>}></Route>
        <Route path={REGISTRATION_ROUTE} element={<Auth/>}></Route>
        <Route path={SERVICES_ROUTE+'/:id'} element={<ServicesPage/>}></Route>
        <Route path={STAFF_ROUTE+'/:id'} element={<StaffPage/>}></Route>
     </Routes>*/}
    </BrowserRouter>


  );
})

export default App;
