import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import {getOneReq, getUserOrders} from "../http/ServiceAPI";
import Button from "react-bootstrap/Button";
import ChangeService from "../components/modals/ChangeService";
import ChangeUser from "../components/modals/ChangeUser";
import {useNavigate} from "react-router-dom";

const Order = () => {
    const navigate=useNavigate()
const [data,setData]=useState([])
const [userData,setUserData]=useState({})
    const [userVisible,setUserVisible]=useState(false)
    useEffect(()=>{
       getUserOrders().then(data=> {
           setData(data)
       })
        getOneReq().then(d=>setUserData(d))

    },[setData])

data.sort((a, b) => a.id > b.id ? 1 : -1);

/*    const date = new Date ();

    const year = date.getFullYear();
    const month = date.getMonth() + 1; //В js месяц с 0 идет, потому +1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    console.log(`${year}-${month}-${day} ${hours}:${minutes}`);*/
    function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }
    return (

        <Container className="p-0 d-flex flex-column">


            <h1 style={{textAlign:"center",paddingTop:"10px"}}>Мои данные</h1>
            <h5 style={{textAlign:"center",paddingTop:"10px"}}>ФИО: {userData.fio}</h5>
            <h5 style={{textAlign:"center",paddingTop:"10px"}}>Телефон: {userData.phoneNumber}</h5>
            <h5 style={{textAlign:"center",paddingTop:"10px"}}>Почта: {userData.email}</h5>

            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={()=>setUserVisible(true)}>
                Изменить данные
            </Button>
            <ChangeUser show={userVisible} onHide={()=>setUserVisible(false)}/>
            <hr/>
            <h1 style={{textAlign:"center",paddingTop:"10px"}}>Мои заказы</h1>
        <Table className="mt-3" striped bordered hover>
            <thead>
            <tr style={{textAlign:'center'}}>
                {/*<th>Номер заказа</th>*/}
                <th>Дата и время заказа</th>
                <th>Дата и время прибытия персонала</th>
                <th>Адрес на котором будут выполняться работы</th>
                <th>ФИО рабочего</th>
                <th>Специальность</th>
                <th>Цена за час работы</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(data =>{
                {//console.log(data.id)

                    const date = new Date (data.date);
                    const year = date.getFullYear();
                    const month = zero_first_format(date.getMonth() + 1); //В js месяц с 0 идет, потому +1
                    const day = zero_first_format(date.getDate());
                    const hours = zero_first_format(date.getHours());
                    const minutes = zero_first_format(date.getMinutes());
                   // console.log(`${year}-${month}-${day} ${hours}:${minutes}`);

                    const date2 = new Date (data.dateOfCompletion);
                    const year2 = date2.getFullYear();
                    const month2 = zero_first_format(date2.getMonth() + 1); //В js месяц с 0 идет, потому +1
                    const day2 = zero_first_format(date2.getDate());
                    const hours2 = zero_first_format(date2.getHours());
                    const minutes2 = zero_first_format(date2.getMinutes());
                   // console.log(`${year2}-${month2}-${day2} ${hours2}:${minutes2}`);

                   return(
                       <tr style={{textAlign:'center'}} key={data.id}>
                       {/* <td>{data.id}</td>*/}
                        <td>{`${year}-${month}-${day} ${hours}:${minutes}`}</td>
                        <td>{`${year2}-${month2}-${day2} ${hours2}:${minutes2}`}</td>
                        <td>{data.address}</td>
                        <td>{data.staff.fio}</td>
                        <td>{data.staff.specialization}</td>
                        <td>{data.services.price} рублей</td>
                    </tr>)
                }
            })}
            </tbody>
        </Table>
        </Container>
    );
};

export default Order;