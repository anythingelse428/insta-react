import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Alert } from "react-bootstrap";
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
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        setAction(router.query.action)
    }, [router.query.action])

    const errorHandle = (msg) => {
        setError(msg)
        setShowError(true)

        setTimeout(() => {
            setError('')
            setShowError(false)
        }, 8000);
        return
    }
    const login = () => {
        if (mail && pwd) {

            Api.login(mail, pwd)
                .then((data) => {
                    switch (data.status) {
                        case 1010:
                            errorHandle("Неверный пароль")
                            break;
                        case 1006:
                            errorHandle("Неверный E-mail")
                            break;
                        default:
                            router.push('/')

                            break;
                    }
                })
        } else errorHandle("Все поля обязательны для заполнения")
    }
    const register = () => {
        if (name && surname && mail && gender && pwd) {
            Api.register(name, surname, mail, gender, pwd)
                .then(res => {
                    switch (res.status) {
                        case 1001:
                            errorHandle("Пожалуйста, введите настоящее имя")
                            break;
                        case 1002:
                            errorHandle("Пожалуйста, введите настоящую фамилию")
                            break;
                        case 1007:
                            errorHandle("На этот e-mail уже зарегистрирован аккаунт")
                            break;
                        case 1008:
                            errorHandle("Пожалуйста, проверьте правильность E-mail")
                            break;
                        case 1009:
                            errorHandle("Длина пароля должна быть не менее 7 символов")
                            break;
                        default:
                            router.push('/')
                            break;
                    }
                })
        }
        else {
            errorHandle("Все поля обязательны для заполнения")
        }
    }

    useEffect(() => {
        useIsAuth((is) => {
            setIsAuth(is)
        })
    }, [])
    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            {showError &&
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                    <Alert.Heading>Ошибка!</Alert.Heading>
                    <p>
                        {error}
                    </p>
                </Alert>
            }
            <Row >
                <div className="col-12  mb-3">
                    <Button size="sm" className="me-3" onClick={() => setAction('login')}>Авторизация</Button>
                    {!isAuth && <Button size="sm" className="" onClick={() => setAction('registration')}>Регистрация</Button>}
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
                        <Form.Check type="radio" label="Мужской" onClick={() => setGender("male")} name="gender" />
                        <Form.Check type="radio" label="Женский" onClick={() => setGender("female")} name="gender" />
                    </Form.Group>

                    <Button onClick={register}>Регистрация</Button>
                </Form>
            }
        </Container>
    )
}
export default Login 