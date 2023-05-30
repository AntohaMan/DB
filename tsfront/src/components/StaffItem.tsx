import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Card} from "@mui/material";

const StaffItem = ({staff}:any) => {
    return (
        <Box>
            <Grid container columns={3} sx={{mt:2,ml:2}} >
            <Card sx={{width:150,cursor:'pointer'}}>

            </Card>
            </Grid>
        </Box>
    );
};

export default StaffItem;