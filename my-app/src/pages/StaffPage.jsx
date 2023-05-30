import React, {useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {getOneStaff, getSpec} from "../http/ServiceAPI";
import {Card, Container,Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";


const StaffPage =observer( () => {
    const {id}=useParams()
    const [staff,setStaff]=useState({})
    const [serv,setServ]=useState({})

    const fetchData = useCallback(async (id) => {
        try{
            const data=await getOneStaff(id)


           await getSpec(data?.specialization).then(data=>setServ(data))
            setStaff(data)
            console.log(data)
        } catch(e){
           console.log(e)
        }
    }, [id])

    useEffect( () => {

        fetchData(id)

    }, [id, fetchData])
    if(staff==={}){return <h1>Loading</h1>}
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                  { <Image width={300} height={300} key={staff.id}  src={process.env.REACT_APP_API_URL+staff?.photo}></Image>}
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{serv.name}</h2>


                    </Row>
                    <Row className="d-flex align-item-center justify-content-center ">
                        <div className="d-flex align-item-center justify-content-center mt-5 me-6">
                            <h4> {staff.fio} </h4>
                        </div>
                    </Row>

                </Col>


                <Col>
                    <Card className="d-flex flex-column align-items-center justify-content-around" style={{width:300,height:300,fontSize:32,border:"5px solid light-gray"}}>
                        <h3>from: {serv.price} rubles.</h3>
                        <Button variant="outline-dark">Add order</Button>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
});

export default StaffPage;