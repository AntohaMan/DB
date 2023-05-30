import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CreateStaff from "../components/modals/CreateStaff";
import CreateService from "../components/modals/CreateService";
import CreateImage from "../components/modals/CreateImage";
import EditService from "../components/modals/ChangeService";
import ChangeService from "../components/modals/ChangeService";
import ChangeStaff from "../components/modals/ChangeStaff";
import DeleteService from "../components/modals/DeleteService";
import DeleteStaff from "../components/modals/DeleteStaff";


const Admin = () => {


    const [serviceVisible,setServiceVisible]=useState(false)
    const [serviceChangeVisible,setServiceChangeVisible]=useState(false)
    const [serviceDeleteVisible,setServiceDeleteVisible]=useState(false)

    const [staffVisible,setStaffVisible]=useState(false)
    const [staffChangeVisible,setStaffChangeVisible]=useState(false)
    const [staffPhotoVisible,setStaffPhotoVisible]=useState(false)
    const [staffDeleteVisible,setStaffDeleteVisible]=useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setServiceVisible(true)}>
                Добавить услугу
            </Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setServiceChangeVisible(true)}>
                Изменить услугу
            </Button>
            <Button variant={"outline-dark"} className="mt-4 p-2 mb-4" onClick={()=>setServiceDeleteVisible(true)}>
                Удалить услугу
            </Button>

            <hr/>

            <Button  variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setStaffVisible(true)}>
                Добавить рабочего
            </Button>
            <Button  variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setStaffPhotoVisible(true)}>
                Добавить/изменить фото рабочего
            </Button>
            <Button  variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setStaffChangeVisible(true)}>
                Изменить рабочего
            </Button>
            <Button  variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setStaffDeleteVisible(true)}>
                Удалить рабочего
            </Button>

            <CreateService show={serviceVisible} onHide={()=>setServiceVisible(false)}/>
            <ChangeService show={serviceChangeVisible} onHide={()=>setServiceChangeVisible(false)}/>
            <DeleteService show={serviceDeleteVisible} onHide={()=>setServiceDeleteVisible(false)}/>

            <CreateStaff show={staffVisible} onHide={()=>setStaffVisible(false)}/>
            <ChangeStaff show={staffChangeVisible} onHide={()=>setStaffChangeVisible(false)}/>
            <CreateImage show={staffPhotoVisible} onHide={()=>setStaffPhotoVisible(false)}/>
            <DeleteStaff show={staffDeleteVisible} onHide={()=>setStaffDeleteVisible(false)}/>



        </Container>
    );
};

export default Admin;