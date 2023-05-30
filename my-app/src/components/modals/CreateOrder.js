import React, {useContext, useEffect, useState} from 'react';
import {Alert, Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {createOrder, createService, getOneStaff, getSpec} from "../../http/ServiceAPI";
import {useNavigate, useParams} from "react-router-dom";
import Calendar from "react-calendar";

const CreateOrder = ({show,onHide}) => {
    const navigate=useNavigate()
    const {id}=useParams()
    const {services}=useContext(Context)
//name,price,lead_time,description
    const [loading,setLoading]=useState(false)
    const [adress,setAdress]=useState('')
    const [service,setService]=useState('')
    const [staff,setStaff]=useState('')
    const [dateOfCompletion,setDateOfCompletion]=useState('')
    const [description,setDescription]=useState('')
    const [err,setErr]=useState(false)

    const close=()=>{
        onHide()
        setAdress('')
        setDateOfCompletion('')


    }

    const addService=async ()=>{
        if(dateOfCompletion!=='' && adress!=='') {
            await createOrder(service.id, id, adress, dateOfCompletion, service.lead_time, service.price).then(data => {
                setAdress('')
                setDateOfCompletion('')
                onHide()
                window.location.reload()
            })
        }
        else{
           setErr(true)
        }
    }

    useEffect( ()=>{
          getOneStaff(id).then( data=> { setStaff(data);setLoading(true)  })

    },[])

    if(loading){
        getSpec(staff.specialization).then(data=> setService(data))
        setLoading(false)

    }
    function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }
    // const date = new Date();
    // const options = { hour12: false, hour: 'numeric'};
    // const options2 = { hour12: false, minute: 'numeric'};
    // const hours = date.toLocaleTimeString('ru-RU', options);
    // const minute = date.toLocaleTimeString('ru-RU', options2);
    const date = new Date();
    const year = date.getFullYear();
    const month = zero_first_format(date.getMonth() + 1); //В js месяц с 0 идет, потому +1
    const day = zero_first_format(date.getDate());
    const hours = zero_first_format(date.getHours());
    const minutes = zero_first_format(date.getMinutes());
   // console.log(`${year}-${month}-${day} ${hours}:${minutes}`);



    const error=()=>(
        <><Alert key='danger' style={{marginTop:'15px'}} variant='danger'>
            Заполните все поля!
        </Alert></>
    )
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h6 >Адресс на котором будет осуществляться работа:</h6>
                    <Form.Control
                        type="text"
                        value={adress}
                        onChange={e=>setAdress(e.target.value)}
                        className="mt-3"
                        placeholder='пример: г. Минск ул. Сурганова, 56'/>
                   {/* <Form.Control
                        type="number"
                        value={price}
                        onChange={e=>setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Цена (пример: 15)"/>*/}
                    <h6 style={{marginTop:'10px',paddingTop:'10px',}}>Дата и время прибытия персонала:</h6>
                    <Form.Control
                        //min="2023-05-30T08:30"
                        min={`${year}-${month}-${day} ${hours}:${minutes}`}
                        type="datetime-local"
                        value={dateOfCompletion}
                        onChange={e=>setDateOfCompletion(e.target.value)}
                        className="mt-3"
                        placeholder="Примерное время выполнения (пример: 1 час)"/>
                    {err && error()}
                    {/*<Calendar value={dateOfCompletion}*/}
                    {/*          onChange={setDateOfCompletion}*/}
                    {/*          locale="ru-RU"*/}
                    {/*          minDate={new Date()} */}
                    {/*          tileDisabled={(dateOfCompletion) => blockedDates.includes((dateOfCompletion.date.getTime()))} */}
                    {/*          className={"m-auto"}/>*/}
                    {/*<Form.Control
                        type="text"
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Описание (пример: Установка)"/>*/}
                    <hr/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={close}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addService}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOrder;