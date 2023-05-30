import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {changeStaff, changeUser, createStaff, getServ, getStaff} from "../../http/ServiceAPI";
import {observer} from "mobx-react-lite";
import Col from "react-bootstrap/Col";
import InputMask from "react-input-mask";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE, ORDER_ROUTE} from "../../utils/consts";

const ChangeUser = observer(({show,onHide}) => {
    const navigate=useNavigate()
    const {services}=useContext(Context)
    useEffect(()=>{
        getServ().then(data=>services.setServices(data))
        getStaff().then(data=>services.setStaff(data[0]))
    },[])


    const [fio,setFio]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const close= ()=>{
        setFio('')
        setPhoneNumber('')
        setEmail('')
        setPassword('')
        onHide()
    }

    const addStaff=async ()=>{
        await changeUser(fio,phoneNumber,email,password).then(data=> {
            setFio('')
            setEmail('')
            setPhoneNumber('')
            setPassword('')
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
                    Изменить данные
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                        <Form.Label column sm={2}>
                            ФИО
                        </Form.Label>
                            <Form.Control type="text" placeholder="ФИО" value={fio} onChange={e =>setFio(e.target.value)} />
                        <Form.Label column sm={2}>
                            Телефон
                        </Form.Label>
                            <InputMask className="form-control" type="tel" mask="+375(99)999-99-99" placeholder="Телефон (пример: +375(29)555-11-22)" value={phoneNumber} onChange={e =>setPhoneNumber(e.target.value)} ></InputMask>
                        <Form.Label column sm={2}>
                            Почта
                        </Form.Label>
                            <Form.Control   type="email" placeholder="email@example.com" value={email} onChange={e =>setEmail(e.target.value)} />
                        <Form.Label column sm={2}>
                            Пароль
                        </Form.Label>
                            <Form.Control  type="password" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />

                    <hr/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={close}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addStaff}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeUser;