import React, { useContext} from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";



const NavBar =observer( ( ) => {
    const {user}=useContext(Context)
    const navigate=useNavigate()

    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
    }
    return (

        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:"white"}} to={MAIN_ROUTE}>GoldHands</NavLink>
                {user.isAuth? <Nav className="ml-auto" style={{color:"white"}}>
                   <Button variant={"outline-light"} onClick={()=>navigate(ADMIN_ROUTE)}>Admin Panel</Button>
                   <Button variant={"outline-light"} onClick={()=>logOut()} className="ms-2">Log out</Button>
                </Nav>:
                    <Nav className="ml-auto" style={{color:"white"}}>
                        <Button variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;