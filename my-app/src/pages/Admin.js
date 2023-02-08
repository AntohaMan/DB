import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CreateStaff from "../components/modals/CreateStaff";
import CreateService from "../components/modals/CreateService";
import CreateImage from "../components/modals/CreateImage";


const Admin = () => {
    const [serviceVisible,setServiceVisible]=useState(false)
    const [staffVisible,setStaffVisible]=useState(false)
    const [staffPhotoVisible,setStaffPhotoVisible]=useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setServiceVisible(true)}>
                Add service
            </Button>
            <Button  variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setStaffVisible(true)}>
                Add staff
            </Button>
           { <Button  variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setStaffPhotoVisible(true)}>
                Add staff photo
            </Button>}
            <CreateService show={serviceVisible} onHide={()=>setServiceVisible(false)}/>
            <CreateStaff show={staffVisible} onHide={()=>setStaffVisible(false)}/>
          {  <CreateImage show={staffPhotoVisible} onHide={()=>setStaffPhotoVisible(false)}/>}

        </Container>
    );
};

export default Admin;