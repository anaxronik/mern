import React, { useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';


const AuthPage = () => {
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({ email: '', password: '', });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (error) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            console.log(data)
            message(data.message)
            if (data.token && data.userId) {
                message('Удачная попытка входа')
            }
        } catch (error) {
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Сокращение ссылок</h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter your email"
                                    id="email"
                                    type="text"
                                    name='email'
                                    onChange={changeHandler}
                                    disabled={loading}
                                />
                                <label htmlFor="email">Your email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter your password"
                                    id="password"
                                    type="password"
                                    name='password'
                                    onChange={changeHandler}
                                    disabled={loading}
                                />
                                <label htmlFor="password">Your password</label>
                            </div>
                        </div>

                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4'
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}
                        > Войти</button>
                        <button
                            className='btn grey lighten-1 black-text'
                            onClick={registerHandler}
                        > Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
