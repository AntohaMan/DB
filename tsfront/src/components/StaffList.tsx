import React, {useContext} from 'react';
import Box from "@mui/material/Box";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import StaffItem from "./StaffItem";

const StaffList =observer( () => {
    const {store}=useContext(Context)
    return (
        <>
       <Box sx={{display:'flex'}}>
           {store.staff.map((staf:any)=>{
            return(<React.Fragment key={staf.id}>
                <StaffItem key={staf.id} staff={staf}/>
            </React.Fragment>)

           })}


       </Box>
        </>
    );
});

export default StaffList;