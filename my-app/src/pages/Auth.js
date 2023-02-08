import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Card} from "react-bootstrap";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import InputMask from 'react-input-mask';
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";



const Auth = observer(() => {
    const {user}=useContext(Context)
    const  [ value ,  setValue ]  =  useState ( )
    const location=useLocation()
    const navigate=useNavigate()
    const isLogin=location.pathname===LOGIN_ROUTE
    const [fio,setFio]=useState('')
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const click=async (e)=>{
        try {
            e.preventDefault()
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(fio, phone, email, password)

            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        }
        catch (e){
            alert(e.response.data.message)
        }

    }

    return (
        <div align={"center"} style={{ display: "flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>

        <Card style={{width:600}} className="p-5">
            <h2 className="mb-3">{isLogin?"Login":"Registration"}</h2>
            { !isLogin?
            <Form onSubmit={(e)=>click(e)}>

                <Form.Group as={Col} className="mb-3" controlId="formHorizontalFIO">
                    <Form.Label column sm={2}>
                        FIO
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="FIO" value={fio} onChange={e =>setFio(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formHorizontalPhone">
                    <Form.Label column sm={2}>
                        Phone
                    </Form.Label>
                    <Col sm={10}>
                        <InputMask className="form-control" type="tel" mask="+375(99)999-99-99" placeholder="Phone" value={phone} onChange={e =>setPhone(e.target.value)} ></InputMask>

                    </Col>
                </Form.Group>


                <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={e =>setEmail(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3">
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin?
                        <div>
                            No account? <NavLink to={REGISTRATION_ROUTE}>Registration!</NavLink>
                        </div>
                            :
                            <div>
                                Have account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                            </div>

                        }
                        <Button className={"mt-3"} type="submit"  >{isLogin?"Login":"Registration"}</Button>
                    </Row>
                </Form.Group>


            </Form>:

                <Form>

                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={e =>setEmail(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)}  />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3">
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin?
                                <div>
                                    No account? <NavLink to={REGISTRATION_ROUTE}>Registration!</NavLink>
                                </div>
                                :
                                <div>
                                    Have account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                                </div>

                            }
                            <Button className={"mt-3"} type="submit" onClick={click}>{isLogin?"Login":"Registration"}</Button>
                        </Row>
                    </Form.Group>


                </Form>
            }

        </Card>




        </div>
    );

});

export default Auth;