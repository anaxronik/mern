import React from 'react';

const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Сокращение ссылок</h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div>
                            <div class="input-field">
                                <input
                                    placeholder="Enter your email"
                                    id="email"
                                    type="text"
                                    name='email'
                                />
                                <label htmlFor="email">Your email</label>
                            </div>
                            <div class="input-field">
                                <input
                                    placeholder="Enter your password"
                                    id="password"
                                    type="password"
                                    name='email'
                                    className='yellow-input'
                                />
                                <label htmlFor="password">Your password</label>
                            </div>
                        </div>

                    </div>
                    <div className="card-action">
                        <button className='btn yellow darken-4' style={{ marginRight: 10 }}> Войти</button>
                        <button className='btn grey lighten-1 black-text'> Регистрация</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
