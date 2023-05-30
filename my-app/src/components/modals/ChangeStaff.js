import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {changeStaff, createStaff, getAllStaff, getServ, getStaff} from "../../http/ServiceAPI";
import {observer} from "mobx-react-lite";
import InputMask from "react-input-mask";

const ChangeStaff = observer(({show,onHide}) => {
    const {services}=useContext(Context)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        getAllStaff().then(data=>{services.setStaff(data);setLoading(true);})


    },[])
if(loading){
    getServ().then(data=>{services.setServices(data)})

    setLoading(false)
}

    const [service,setService]=useState('')
    const [fio,setFio]=useState('')
    const [phone,setPhone]=useState('')
    const [birthday,setBirthday]=useState('')
    const [specialization,setSpecialization]=useState('')

//   const [photo,setPhoto]=useState(null)
    /* const selectFile=e=>{
         setPhoto(e.target.files[0])
     }*/

    const close= ()=>{
        services.setSelectedService('')
        services.setSelectedStaff("")
        setFio('')
        setBirthday('')
        setPhone('')
        setSpecialization('')
        onHide()
    }

    const addStaff=async ()=>{
        await changeStaff(services.selectedStaff.id,fio,birthday,phone,services.selectedService.name).then(data=> {
            services.setSelectedService('')
            services.setSelectedStaff("")
            setFio('')
            setBirthday('')
            setPhone('')
            setSpecialization('')
            onHide()
        })
        window.location.reload()

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
                    Изменить рабочего
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>
                            {services.selectedStaff.fio || 'Выбрать рабочего'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {services.staf.map(serv=>
                             <Dropdown.Item key={serv.id} onClick={()=>{services.setSelectedStaff(serv); }}>{serv.fio}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown style={{marginTop:"5px"}}>
                        <Dropdown.Toggle >
                            {services.selectedService.name || 'Выбрать услугу'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {services.serv.map(serv=>
                                <Dropdown.Item key={serv.id}  onClick={()=>{services.setSelectedService(serv); }}>{serv.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={fio}
                        onChange={e=>setFio(e.target.value)}
                        className="mt-3"
                        placeholder="ФИО (пример: Иванов Иван Иванович)"/>

                    <h6 style={{marginTop:'10px',paddingTop:'10px',}}>Дата рождения:</h6>
                    <Form.Control
                        value={birthday}
                        onChange={e=>setBirthday(e.target.value)}
                        className="mt-3"
                        placeholder="Дата рождения (пример: 2000-11-21)"
                        type='date'/>

                    <InputMask
                        className="form-control mt-3"
                        type="tel"
                        mask="+375(99)999-99-99"
                        placeholder="Телефон (пример: +375(29)555-11-22)"
                        value={phone}
                        onChange={e =>setPhone(e.target.value)} ></InputMask>

                    {/*<Form.Control
                        value={phone}
                        onChange={e=>setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Телефон (пример: +375295551122)"
                        type="tel"/>*/}
                    {/* <Form.Control
                        value={specialization}
                        onChange={e=>setSpecialization(e.target.value)}
                        className="mt-3"
                        placeholder="Enter staff specialization"/>*/}
                    {/*<Form.Control
                        onChange={selectFile}
                        className="mt-3"
                        placeholder="Enter staff photo"
                    type="file"/>*/}
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

export default ChangeStaff;