import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {SERVICES_ROUTE, STAFF_ROUTE} from "../utils/consts";

const StaffItem = ({staff}) => {
    const navigate=useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={()=>navigate(STAFF_ROUTE +"/"+ staff.id)}>
           <Card style={{width:150,cursor:"pointer"}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL+staff.photo}/>
               <div className="text-black-50 d-flex justify-content-between align-items-center">
                   <div>{staff.specialization}</div>
                   <div></div>
               </div>
               <div>{staff.fio}</div>
           </Card>
        </Col>
    );
};

export default StaffItem;