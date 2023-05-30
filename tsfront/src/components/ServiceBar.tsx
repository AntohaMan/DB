import React, {useContext} from 'react';
import {Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from "@mui/material/styles";
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

const ServiceBar =observer( () => {
    const {store}=useContext(Context)
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', maxWidth: 360,}}>
        <List  component="nav" aria-label="main mailbox folders"  sx={{maxWidth:200}}>
                    {store.services.map((serv:any,index:any)=> {

                        return(
                        <React.Fragment  key={serv.id}>
                        <ListItem  key={serv.id} disablePadding >
                        <ListItemButton  key={serv.id} sx={{cursor:"pointer",borderColor: 'primary.main',  }} selected={serv.id===store.selectedService.id} onClick={()=>store.setSelectedService(serv)}>

                            <ListItemText key={serv.id} primary={serv.name}/>

                        </ListItemButton>
                        </ListItem>
                            {index<store.services.length-1? <Divider />:null}

                        </React.Fragment>)
                        }
                    )}
            </List>
        </Box>
        </ThemeProvider>
    );
});

export default ServiceBar;