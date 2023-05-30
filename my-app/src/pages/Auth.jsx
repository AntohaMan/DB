import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Alert, Card, Container} from "react-bootstrap";
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
    const [err,setErr]=useState('')

    const fieldClear= ()=>{
        setFio('')
        setPhone('')
        setEmail('')
        setPassword('')
        setErr('')
    }


let data;
    const error=(e)=>(
        <><Alert key='danger' variant='danger'>
            {`${e}`}
        </Alert></>
    )
    const click=async (e)=>{
        e.preventDefault()
        if (isLogin) {
            data = await login(email, password).catch((e) => {
                setErr(e.response.data.message);
            })
            if(data){await user.setUser(user)
                await user.setIsAuth(true)
                 await navigate(MAIN_ROUTE)
              await  window.location.reload()}
        }
        else if(!isLogin) {
            data = await registration(fio, phone, email, password).catch((e) => {
                setErr(e.response.data.message);
            })
            if(data){await user.setUser(user)
                await user.setIsAuth(true)
                await navigate(MAIN_ROUTE)
                await  window.location.reload()}
        }
        else{

        }


        /*try {
            e.preventDefault()

            if (isLogin) {
                data = await login(email, password).catch((e)=> {
                    setErr(e.response.data.message);
                })
                if(err===null)return



            } else {
                data = await registration(fio, phone, email, password)
            }

                // user.setUser(user)
                // user.setIsAuth(true)
                // navigate(MAIN_ROUTE)
                //window.location.reload()
        }
        catch (e){
        setErr(e)


        }*/

    }

    return (

        /*<div align={"center"} style={{ display: "flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>*/
       <Container className='d-flex justify-content-center align-items-center '
            style={{height:window.innerHeight-54}}>
        <Card  style={{width:600}} className="p-5">
            <h2 className="m-auto">{isLogin?"Войти":"Регистрация"}</h2>
            { isLogin?
                <Form onSubmit={(e)=>click(e)}>

                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Почта
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  type="email" placeholder="email@example.com" value={email} onChange={e =>setEmail(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Пароль
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control minLength={6} maxLength={16}  type="password" placeholder="6-16 символов" value={password} onChange={e =>setPassword(e.target.value)}  />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3">
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {err && error(err)}
                            {isLogin?
                                <div>
                                    Нет аккаунта? <NavLink onClick={fieldClear} to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink  to={LOGIN_ROUTE}>Войди!</NavLink>
                                </div>

                            }
                            <Button className={"mt-3"} type="submit" >{isLogin?"Войти":"Регистрация"}</Button>
                        </Row>
                    </Form.Group>


                </Form>
                :
                <Form   onSubmit={(e)=>click(e)}>

                    <Form.Group  as={Col} className="mb-3" controlId="formHorizontalFIO">
                        <Form.Label column sm={2}>
                            ФИО
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="ФИО" value={fio} onChange={e =>setFio(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalPhone">
                        <Form.Label column sm={2}>
                            Телефон
                        </Form.Label>
                        <Col sm={10}>
                            <InputMask  pattern="^\+375(\s+)?\(?(17|25|29|33|44)\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$"  className="form-control" type="tel" mask="+375(99)999-99-99" placeholder="Телефон" value={phone} onChange={e =>setPhone(e.target.value)} ></InputMask>

                        </Col>
                    </Form.Group>


                    <Form.Group  as={Col} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Почта
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  type="email" placeholder="email@example.com" value={email} onChange={e =>setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Пароль
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control minLength={6} maxLength={16}  type="password" placeholder="6-16 символов" value={password} onChange={e =>setPassword(e.target.value)} />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3">
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {err && error(err)}
                            {isLogin?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink onClick={fieldClear} to={LOGIN_ROUTE}>Войди!</NavLink>
                                </div>

                            }
                            <Button className={"mt-3"} type="submit"  >{isLogin?"Войти":"Регистрация"}</Button>
                        </Row>
                    </Form.Group>


                </Form>
            }

        </Card>
            </Container>




        /*</div>*/
    );

});

export default Auth;