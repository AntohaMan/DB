import React from 'react';
import {Container} from "@mui/material";
import ServiceBar from "../components/ServiceBar";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import StaffList from "../components/StaffList";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));
const Main = () => {
    return (

       <Box sx={{mt:2,ml:2}}>
           <Grid  container columns={12}  spacing={1} >
               <Grid    sx={{mt:2,ml:2,width: '100%', maxWidth: 360}} >
                   <Grid container columns={3} >
                      <Item sx={{boxShadow: 4, }}><ServiceBar/></Item>
                   </Grid>
               </Grid>
               <Grid   sx={{mt:2,ml:2,width: '100%', maxWidth: 360}} >
                   <Grid container columns={9} >
                   <Item sx={{boxShadow: 4}}><StaffList/></Item>
                   </Grid>
               </Grid>

           </Grid>
       </Box>



    );
};

export default Main;