import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {createService} from "../../http/ServiceAPI";

const CreateService = ({show,onHide}) => {
    const {services}=useContext(Context)
//name,price,lead_time,description
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [lead_time,setLead_time]=useState('')
    const [description,setDescription]=useState('')


    const close=()=>{
        onHide()
        setName('')
        setPrice('')
        setLead_time('')
        setDescription('')
    }
    const addService=async ()=>{
        await createService(name,price,lead_time,description).then(data=> {
            setName('')
            setPrice('')
            setLead_time('')
            setDescription('')
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
                    Добавить услугу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Control
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
                        placeholder="Описание (пример: Установка)"/>
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

export default CreateService;