import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ServicesBar from "../components/ServicesBar";
import StaffBar from "../components/StaffBar";
import StaffList from "../components/StaffList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getServ, getStaff} from "../http/ServiceAPI";

const Main =observer( () => {
    const {services}=useContext(Context)
    useEffect(()=>{
        getServ().then(data=>services.setServices(data))
        getStaff().then(data=>services.setStaff(data))
    },[])
    return (

        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <ServicesBar/>
                </Col>
                <Col md={9}>

                    <StaffList/>
                </Col>
            </Row>
        </Container>

    );
});

export default Main;