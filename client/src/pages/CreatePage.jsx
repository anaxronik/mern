import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const { request } = useHttp()
    const message = useMessage()
    const history = useHistory()

    const onKeyPressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    { longLink: link },
                    { Authorization: `Bearer ${auth.token}` }
                )
                message(`Созданна короткая ссылка`)
                history.push(`/detail/${data._id}`)

            } catch (error) { message('Не удалось создать ссылку') }
        }
    }

    const onChangeHandler = (event) => {
        setLink(event.target.value)
    }

    return (
        <div className='row'>
            <div className="col s8 offset-s2">
                <input
                    placeholder="Введите вашу ссылку"
                    id="link"
                    type="text"
                    value={link}
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeHandler}
                />
                <label htmlFor="link"></label>
            </div>
        </div>
    )
}

export default CreatePage;