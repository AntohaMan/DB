import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {createStaff, getServ, getStaff} from "../../http/ServiceAPI";
import {observer} from "mobx-react-lite";

const CreateStaff = observer(({show,onHide}) => {
    const {services}=useContext(Context)
    useEffect(()=>{
        getServ().then(data=>services.setServices(data))
        getStaff().then(data=>services.setStaff(data))
    },[])


    const [service,setService]=useState('')
    const [fio,setFio]=useState('')
    const [phone,setPhone]=useState('')
    const [birthday,setBirthday]=useState('')
    const [specialization,setSpecialization]=useState('')
//   const [photo,setPhoto]=useState(null)
   /* const selectFile=e=>{
        setPhoto(e.target.files[0])
    }*/
    const addStaff=async ()=>{
       await createStaff(fio,birthday,phone,specialization).then(data=> {
           setFio('')
           setBirthday('')
           setPhone('')
           setSpecialization('')
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
                    Add staff
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle >
                            {services.selectedService.name || 'Select service'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {services.serv.map(serv=>
                                <Dropdown.Item key={serv.id} onClick={()=>{services.setSelectedService(serv); console.log(serv.target)}}>{serv.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={fio}
                        onChange={e=>setFio(e.target.value)}
                        className="mt-3"
                        placeholder="Enter staff FIO"/>
                    <Form.Control
                        value={birthday}
                        onChange={e=>setBirthday(e.target.value)}
                        className="mt-3"
                        placeholder="Enter staff birthday"/>
                    <Form.Control
                        value={phone}
                        onChange={e=>setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Enter staff phone"
                        type="tel"/>
                    <Form.Control
                        value={specialization}
                        onChange={e=>setSpecialization(e.target.value)}
                        className="mt-3"
                        placeholder="Enter staff specialization"/>
                    {/*<Form.Control
                        onChange={selectFile}
                        className="mt-3"
                        placeholder="Enter staff photo"
                    type="file"/>*/}
                    <hr/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addStaff}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateStaff;