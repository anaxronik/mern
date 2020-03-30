import React, { useState } from 'react';


const AuthPage = () => {
    const [form, setForm] = useState({ email: '', password: '', });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })

        console.log(`\nchangeHandler on ${event.target.name} = "${event.target.value}"`)
        console.log(form);
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Сокращение ссылок</h2>

                <div className="card blue darken-1">
                    <form action="">
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
                                    />
                                    <label htmlFor="password">Your password</label>
                                </div>
                            </div>

                        </div>
                        <div className="card-action">
                            <button className='btn yellow darken-4' style={{ marginRight: 10 }}> Войти</button>
                            <button className='btn grey lighten-1 black-text'> Регистрация</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
