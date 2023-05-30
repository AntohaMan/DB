import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {changeService, createService, deleteService, getServ} from "../../http/ServiceAPI";
import {observer} from "mobx-react-lite";

const ChangeService =observer( ({show,onHide}) => {
    const {services}=useContext(Context)
//name,price,lead_time,description

    useEffect(()=>{
        getServ().then(data=>services.setServices(data))
    },[])

    const [id,setId]=useState('')
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [lead_time,setLead_time]=useState('')
    const [description,setDescription]=useState('')


    const close=()=>{
        services.setSelectedService("")
        onHide()

    }
    const delService=async ()=>{
        await deleteService(services.selectedService.id).then(data=> {
            services.setSelectedService("")
            onHide()
            window.location.reload()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"

            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle >
                            {services.selectedService.name || 'Выбрать услугу'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {services.serv.map(serv=>
                                <Dropdown.Item key={serv.id}  onClick={()=>{services.setSelectedService(serv);setId(serv.id) }}>{serv.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {/*<Form.Control
                        type="text"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="mt-3"
                        placeholder='Название (пример: Электрика)'/>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={e=>setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Цена (пример: 15)"/>
                    <Form.Control
                        type="text"
                        value={lead_time}
                        onChange={e=>setLead_time(e.target.value)}
                        className="mt-3"
                        placeholder="Примерное время выполнения (пример: 1 час)"/>
                    <Form.Control
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
                <Button variant={"outline-success"} onClick={delService}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeService;