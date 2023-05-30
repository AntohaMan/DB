import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import {Container} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE, STAFF_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";
import {logOUT} from "../http/userAPI";
import {getOneReq, searchOneStaff} from "../http/ServiceAPI";
import {forEach} from "react-bootstrap/ElementChildren";
import Form from "react-bootstrap/Form";



const NavBar =observer( ( ) => {
    const {user}=useContext(Context)
    const navigate=useNavigate()
    const[userData,setUserData]=useState({})
    const[userRole,setUserRole]=useState('')
    const[loading,setLoading]=useState(false)
    const[search,setSearch]=useState('')

    let a;
    useEffect(()=>{
        getOneReq().then(d=> {
            setUserData(d);setLoading(true)

        })

    },[])

    useEffect(()=>{
        if(loading) {
            setUserRole(userData.roles[0].id)

        }
    })
//if(loading){userData.roles.map((d)=>setUserRole(d.id))}


const AdminNav=()=>(
      <><Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Панель администратора</Button>
        <Button variant={"outline-light"} onClick={()=>navigate(ORDER_ROUTE)} className="ms-2">Мой профиль</Button>
        <Button variant={"outline-light"} onClick={()=> {logOut();navigate(MAIN_ROUTE)}} className="ms-2">Выйти</Button></>)

const UserNav=()=>(<>
    <Button variant={"outline-light"} onClick={()=>navigate(ORDER_ROUTE)} className="ms-2">Мой профиль</Button>
        <Button variant={"outline-light"} onClick={()=> {logOut();navigate(MAIN_ROUTE)}} className="ms-2">Выйти</Button></>)


    const logOut=async ()=>{
        await user.setUser({})
        await user.setIsAuth(false)
        await logOUT()
    }
    const searchStaff= ()=>{
        if(search!=='') {
            searchOneStaff(search).then((data) => {

                if (data) {
                    navigate(STAFF_ROUTE + "/" + data.id)
                    setSearch('')
                    window.location.reload()
                } else {
                    navigate(MAIN_ROUTE);
                    setSearch('')
                }
            })
        }
        else {
            navigate(MAIN_ROUTE);
            setSearch('')
        }

    }

    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:"white"}} to={MAIN_ROUTE}>ЗолотыеРуки</NavLink>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Поиск сотрудника"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value);}}
                    />
                    <Button variant="outline-light" onClick={searchStaff}>Найти</Button>
                </Form>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color:"white"}}>

                        { userRole==1?AdminNav()
                            :
                            UserNav()
                        }
                </Nav>
                    :
                    <Nav className="ml-auto" style={{color:"white"}}>
                        <Button variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;