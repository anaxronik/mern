import React, { useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from '../components/LinkCard'
import { useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext'

const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const [link, setLink] = useState({})
    const { request } = useHttp()
    const linkId = useParams().id

    const getLinkFromServer = useCallback(async () => {
        try {
            const FetchedLink = await request(
                `/api/link/${linkId}`,
                'GET',
                null,
                { Authorization: `Bearer ${token}` }
            )
            setLink(FetchedLink)
        } catch (error) {
        }
    }, [token, linkId, request]

    )

    useEffect(() => {
        getLinkFromServer()
    }, [getLinkFromServer])

    return (
        <div>
            <LinkCard link={link} />
        </div>
    );
}

export default DetailPage;
