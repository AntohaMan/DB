import React, {useContext, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {createService} from "../../http/ServiceAPI";

const CreateService = ({show,onHide}) => {
    const {services}=useContext(Context)

    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [value3,setValue3]=useState('')
    const [value4,setValue4]=useState('')

    const addService=async ()=>{
        await createService(name,price,value3,value4).then(data=> {
            setName('')
        onHide()
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
                    Add service
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="mt-3"
                    placeholder="Enter service name"/>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                        className="mt-3"
                        placeholder="Enter service price"/>
                    <Form.Control
                        type="text"
                        value={value3}
                        onChange={e=>setValue3(e.target.value)}
                        className="mt-3"
                        placeholder="Enter service lead time"/>
                    <Form.Control
                        type="text"
                        value={value4}
                        onChange={e=>setValue4(e.target.value)}
                        className="mt-3"
                        placeholder="Enter service description"/>
                    <hr/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addService}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateService;