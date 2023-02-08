import React from 'react';
import {observer} from "mobx-react-lite";
import  {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {createPhotoStaff, getServ, getStaff} from "../../http/ServiceAPI";

const AddImage =observer( ({show,onHide}) => {
    const {services}=useContext(Context)
    useEffect(()=>{
        getServ().then(data=>services.setServices(data))
        getStaff().then(data=>services.setStaff(data))
    },[])
    const [photo,setPhoto]=useState(null)
    const [Id,setId]=useState('')
 const selectFile=e=> {
     setPhoto(e.target.files[0])
 }
console.log(services.selectedStaff.id)
    const addImage=async ()=>{
        const formData=new FormData()
        formData.append('staffId',services.selectedStaff.id)
        formData.append('image',photo)
       await createPhotoStaff(formData).then(data=>onHide())
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
                     <Dropdown.Toggle>
                         {services.selectedStaff.fio || 'Select staff'}
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                         {services.staf.map(serv=>
                             <Dropdown.Item key={serv.id} onClick={()=>{services.setSelectedStaff(serv); setId(serv.id)}}>{serv.fio}</Dropdown.Item>
                         )}
                     </Dropdown.Menu>
                 </Dropdown>

                 {<Form.Control
                     onChange={selectFile}
                     className="mt-3"
                     placeholder="Enter staff photo"
                 type="file"/>}
                 <hr/>
             </Form>

         </Modal.Body>
         <Modal.Footer>
             <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
             <Button variant={"outline-success"} onClick={addImage}>Add</Button>
         </Modal.Footer>
     </Modal>
 );
});

export default AddImage;
