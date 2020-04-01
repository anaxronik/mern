import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext'
import LinksList from '../components/LinksList'


const LinksPage = () => {
    const [links, setLinks] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request(
                '/api/link/',
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            setLinks(fetched)
        } catch (error) {
            console.log(error.message)
        }
    }, [token, request]
    )

    useEffect(
        () => {
            fetchLinks()
        }, [fetchLinks]
    )

    if (loading) {
        return <h3 className='center'>Загрузка ссылок</h3>
    }

    return (
        <div>
            <LinksList links={links} />
        </div>
    );
}

export default LinksPage;
