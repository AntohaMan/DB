import React from 'react';
import {Card, Container, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location=useLocation()
    const isLogin=location.pathname===LOGIN_ROUTE
    return (
        <Container
            sx={{display: 'flex',
                justifyContent: 'center',
                alignItems:"center",
                height:window.innerHeight-54}}>
            <Card sx={{width:600,
                       p:5}} >
                {isLogin?
                <h2 style={{textAlign:"center"}}>Authorization</h2>
                :
                <h2 style={{textAlign:"center"}}>Registration</h2>}
                {isLogin ?
                <Box key={1}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        placeholder="example: ivan1@gmail.com"
                        sx={{mt:3}}
                    />
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{mt:3}}
                    />
                    <Box  sx={{display:"flex",
                                  justifyContent: 'space-between',
                                  mt:3,
                    }}>
                        <div >
                            Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                        </div>
                        <Button variant="contained" color="success">
                            Login
                        </Button>
                    </Box>
                </Box>
                :
                    <Box key={2}>
                         <TextField
                        fullWidth
                        id="outlined-required"
                        label="FIO"
                        placeholder="example: Ivanov Ivan Ivanovich"
                        sx={{mt:3}}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        label="Phone"
                        placeholder="example: +375(29)999-99-99"
                        sx={{mt:3}}
                    />
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            placeholder="example: ivan1@gmail.com"
                            sx={{mt:3}}
                        />
                        <TextField
                            fullWidth
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="6 to 16 characters"
                            sx={{mt:3}}
                        />
                        <Box  sx={{display:"flex",
                            justifyContent: 'space-between',
                            mt:3,
                        }}>
                            <div >
                                 Have an account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                            </div>
                            <Button variant="contained" color="success">
                                Register
                            </Button>
                        </Box>
                    </Box>}



            </Card>
        </Container>
    );
};

export default Auth;