import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";

const StaffBar =observer( () => {
    const {services}=useContext(Context)
    return (
        <Row className="d-flex">
            {services.staf.map(staff=>
            <Card
                key={staff.id}
                className="p-3"
            >
                {staff.fio}
            </Card>
            )}
        </Row>
    );
});

export default StaffBar;