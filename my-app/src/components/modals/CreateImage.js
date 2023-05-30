import React from 'react';
import {observer} from "mobx-react-lite";
import  {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Context} from "../../index";
import {createPhotoStaff, getAllStaff, getServ, getStaff} from "../../http/ServiceAPI";

const AddImage =observer( ({show,onHide}) => {
    const {services}=useContext(Context)
    useEffect(()=>{
      //  getServ().then(data=>services.setServices(data))
        getAllStaff().then(data=>services.setStaff(data))
    },[])

    const [photo,setPhoto]=useState(null)
    const [Id,setId]=useState('')

 const selectFile=async e=> {
     setPhoto(e.target.files[0])
 }
//console.log(services.selectedStaff.id)
    const addImage=async ()=>{
        const formData=new FormData()
       await formData.append('staffId',services.selectedStaff.id)
       await formData.append('image',photo)
        const res=fetch(`${process.env.REACT_APP_API_URL}api/staff/add/image`,{
            method:'PUT',
            body:formData
        })
       //await createPhotoStaff(formData).then(data=>onHide())
        services.setSelectedStaff("")
        onHide()
        window.location.reload()
    }
    const close= ()=>{
        onHide()
        services.setSelectedStaff("")
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
                 Добавить/изменить фото рабочего
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

                 {<Form.Control
                     onChange={selectFile}
                     className="mt-3"
                     placeholder="Enter staff photo"
                     accept="image/*"
                 type="file"/>}
                 <hr/>
             </Form>

         </Modal.Body>
         <Modal.Footer>
             <Button variant={"outline-danger"} onClick={close}>Закрыть</Button>
             <Button variant={"outline-success"} onClick={addImage}>Добавить/изменить</Button>
         </Modal.Footer>
     </Modal>
 );
});

export default AddImage;
