import React, {useContext} from 'react';
import '../index.css';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {green, red} from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import {dark} from "@mui/material/styles/createPalette";
import {observer} from "mobx-react-lite";
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ffffff',

        },
    },
});
const NavBar =observer( () => {
    const {user}=useContext(Context);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar color={"primary"}  position="static">
                    <Toolbar>
                        <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
                            <NavLink style={{color:"white",textDecoration: 'none'}} to={MAIN_ROUTE}>
                            GoldHands
                            </NavLink>
                        </Typography>
                        {user.isAuth ?
                        <Toolbar>
                        <Button color="secondary"  variant='outlined'>Admin panel</Button>
                        <Button color="secondary"  variant='outlined' sx={{ ml: 2 }} onClick={()=>user.setIsAuth(false)}>Logout</Button>
                        </Toolbar>
                        :
                        <Toolbar>
                            <Button color="secondary"  variant='outlined' onClick={()=>user.setIsAuth(true)}>Authorization</Button>
                        </Toolbar>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
});

export default NavBar;

/*
{fontSize:'16px',
    color:'gold',
    textShadow:'1px 1px 3px black',
    marginLeft:'30px',
    border:"black",
    borderWidth:'30px'
}*/
