import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import StaffItem from "./StaffItem";

const StaffList = observer( ()=> {
    const {services}=useContext(Context)
    return (
        <Row className="d-flex">
            {services.staf.map(staff=>
                <StaffItem key={staff.id} staff={staff}/>
            )}
        </Row>
    );
});

export default StaffList;