import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Alert, Card, Carousel, Container, FormControl, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import {createFeedback, getFeedbackById, getOneStaff, getServ, getSpec} from "../http/ServiceAPI";
import {observer} from "mobx-react-lite";
import CreateService from "../components/modals/CreateService";
import CreateOrder from "../components/modals/CreateOrder";
import {Context} from "../index";
import Form from "react-bootstrap/Form";

const ServicesPage = observer(() => {
    const {user}=useContext(Context)
    const [service,setService]=useState({})
    const [staff,setStaff]=useState({})
    const [loading,setLoading]=useState(false)
    const [orderVisible,setOrderVisible]=useState(false)
    const [err,setErr]=useState(false)
    const [text,setText]=useState('')
    const [reviews,setReviews]=useState()
    const {id}=useParams()


    useEffect(()=>{

             getOneStaff(id).then( data=> {setStaff(data) ;setLoading(true) })



    },[])

    useEffect(()=>{
        getFeedbackById(id).then(data=>setReviews(data))

    },[])


reviews?.sort((a, b) => a.id < b.id ? 1 : -1)
if(loading){
    getSpec(staff?.specialization).then(data => setService(data))
    setLoading(false)

}
const feedBack=async (e)=>{
    e.preventDefault()
    if(text && text!==''){
    const res =await createFeedback(staff.id,text);
    window.location.reload();}
    else{
        window.location.reload();
    }

}


    const error=()=>(
        <><Alert key='danger' variant='danger'>
            Авторизуйтесь!
        </Alert></>
    )
    function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300}  src={process.env.REACT_APP_API_URL+staff.photo}></Image>
                </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <h2>{staff.specialization}</h2>
                    <div className="d-flex align-item-center justify-content-center">

                    </div>
                </Row>
            </Col>
                <Col>
                    <Card className="d-flex flex-column align-items-center justify-content-around" style={{width:300,height:300,fontSize:32,border:"5px solid light-gray"}}>
                        <h3>от: {service.price} рублей.</h3>
                        <Button variant="outline-dark" onClick={()=> {
                            user.isAuth?setOrderVisible(true)
                                :
                                setErr(true)
                        }}>Добавить заказ</Button>
                        {err && error()}
                        <CreateOrder show={orderVisible} onHide={()=>setOrderVisible(false)}/>
                    </Card>
                </Col>
            </Row><h5 style={{marginTop:'15px',marginBottom:'30px'}}>{staff.fio}</h5>
            <h1 style={{marginTop:"15px"}}>Общие сведения</h1>
            <Row  className="d-flex flex-column m-3">
                {
                 <Row key={service.id} style={{background:0%2===0?"lightgray":"transparent",padding:10}}>
                     {service.leadTime}: {service.price+' рублей'}
                 </Row>
                }
            </Row>
            <Row  className="d-flex flex-column m-3">

                {
                    <Row key={service.id} style={{background:0%2===1?"lightgray":"transparent",padding:10}}>
                        {service.description}
                    </Row>
                }
            </Row>
            <Form onSubmit={(e)=>feedBack(e)}>
                <h1 style={{marginTop:"15px"}}>Отзывы</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Оставить отзыв</Form.Label>
                <Form.Control as="textarea" rows={3} value={text} onChange={e =>setText(e.target.value)} />
                <FormControl type="submit" ></FormControl>
            </Form.Group>
            </Form>
            <Row  className="d-flex flex-column m-3">
                {reviews?.map((data,index) => {
                    {
                        const date = new Date(data.created_at);
                        const year = date.getFullYear();
                        const month = zero_first_format(date.getMonth() + 1); //В js месяц с 0 идет, потому +1
                        const day = zero_first_format(date.getDate());
                        const hours = zero_first_format(date.getHours());
                        const minutes = zero_first_format(date.getMinutes());
                        // console.log(`${year}-${month}-${day} ${hours}:${minutes}`);
                        return(
                            <Row key={data.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
                                {`(${year}-${month}-${day} ${hours}:${minutes})`} {data.feedback}
                            </Row>
                        )
                    }
                })}
            </Row>

        </Container>
    );
});

export default ServicesPage;