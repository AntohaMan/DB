import React, {useEffect, useState} from 'react';
import {Card, Carousel, Container, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import {getOneStaff, getServ} from "../http/ServiceAPI";

const ServicesPage = () => {
    const [service,setService]=useState({info:[]})
    const [staff,setStaff]=useState({info:[]})
    const {id}=useParams()
    useEffect(()=>{
          // getServ(id).then(data=>setService(data))
           // getOneStaff(id).then(data=>setStaff(data))

    },[])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300}  src={process.env.REACT_APP_API_URL+staff.photo}></Image>
                </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <h2>{service.fio}</h2>
                    <div className="d-flex align-item-center justify-content-center">
                        hikjhk
                    </div>
                </Row>
            </Col>
                <Col>
                    <Card className="d-flex flex-column align-items-center justify-content-around" style={{width:300,height:300,fontSize:32,border:"5px solid light-gray"}}>
                        <h3>from: {service.price} rubles.</h3>
                        <Button variant="outline-dark">Add order</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Order content</h1>
                {service.info.map((info,index)=>
                 <Row key={info.id} style={{background:index%2===0?"lightgray":"transparent",padding:10}}>
                     {info.lead_time}:{info.price}
                 </Row>
                )}
            </Row>
        </Container>
    );
};

export default ServicesPage;