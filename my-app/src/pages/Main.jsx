import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ServicesBar from "../components/ServicesBar";
import StaffList from "../components/StaffList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getServ, getStaff} from "../http/ServiceAPI";
import Pages from "../components/Pages";

const Main =observer( () => {
    const {services}=useContext(Context)
    useEffect(()=>{
        getServ().then(data=>services.setServices(data))
        getStaff(null,8,1).then(data=>{
            services.setStaff(data[0])
            services.setTotalCount(data[1])

        })
    },[])

    useEffect(()=>{
        getStaff(services.selectedService.name,8,services.page).then(data=>{
            services.setStaff(data[0])
            services.setTotalCount(data[1])

        })
    },[services.page,services.selectedService])
    return (

        <Container>
            <Row className="mt-2">
                <Col md={3} >
                    <ServicesBar/>
                </Col>
                <Col md={9} >
                    <StaffList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>

    );
});

export default Main;