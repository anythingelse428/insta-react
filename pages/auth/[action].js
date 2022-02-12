import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Api, useIsAuth } from "../../hooks/Auth";
import * as React from 'react';

function Login() {
    const [isAuth, setIsAuth] = useState(false)
    const [mail, setMail] = useState('')
    const [pwd, setPwd] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [gender, setGender] = useState('male')
    const router = useRouter()
    const [action, setAction] = useState(router.query.action)
    useEffect(() => {
        setAction(router.query.action)
    }, [router.query.action])
    console.log(router.query.action);
    const login = () => {
        if (!mail || !pwd) return
        Api.login(mail, pwd)
            .then(({ data }) => { console.log(data); })
        router.push('/')
    }
    const register = () => {
        Api.register(name, surname, mail, gender, pwd)
        router.push('/')
    }
    const logout = () => {
        Api.logout()
        router.push('/')
    }
    useEffect(() => {
        useIsAuth((is) => {
            setIsAuth(is)
            console.log(is);
        })
    }, [])
    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Row >
                <div className="col-12  mb-3">
                    <Button size="sm" className="me-3" onClick={() => setAction('login')}>Авторизация</Button>
                    <Button size="sm" className="" onClick={() => setAction('registration')}>Регистрация</Button>
                </div>
            </Row>
            {action == 'login' &&
                <Form className="col-5 border p-5 ">
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="E-mail" value={mail} onChange={(e) => { setMail(e.target.value) }} />
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control placeholder="Пароль" type="password" value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                    </Form.Group>
                    <Button onClick={login}>Войти</Button>
                    <h3 className="dashedHeader">
                        или
                    </h3>
                    <a href="https://iny.su/auth?app_id=5"><img src="https://iny.su/favicon.ico?v=2" width={"10%"}/> Войти через INY</a>
                </Form>
            }
            {action == 'registration' &&
                <Form className="col-5 border p-5 ">
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control placeholder="Имя" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control placeholder="Фамилия" type="text" value={surname} onChange={(e) => { setSurname(e.target.value) }} />
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="E-mail" type="email" value={mail} onChange={(e) => { setMail(e.target.value) }} />
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control placeholder="Пароль" type="password" value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Check type="radio" label="Мужык" onClick={() => setGender("male")} name="gender" />
                        <Form.Check type="radio" label="neМужык" onClick={() => setGender("female")} name="gender" />
                    </Form.Group>

                    <Button onClick={register}>Регистрация</Button>
                </Form>
            }
        </Container>
    )
}
export default Login 