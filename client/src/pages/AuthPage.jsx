import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';


const AuthPage = () => {
    const { loading, request } = useHttp()
    const [form, setForm] = useState({ email: '', password: '', });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            console.log('Data: ', data);
        } catch (error) {
            console.log('> Error in registerHandler');
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
                        <button className='btn yellow darken-4' style={{ marginRight: 10 }}> Войти</button>
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
