import React from 'react'
import { Link } from 'react-router-dom'


export default function LinksList(props) {

    if (!props.links) {
        return <p className='center'>Ссылок пока нет</p>
    }

    return (
        <div>
            <table className="highlight">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Оригинал</th>
                        <th>Cокращенная</th>
                        <th>Открыть</th>
                    </tr>
                </thead>

                <tbody>
                    {props.links.map((link, index) => {
                        return <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.longLink}</td>
                            <td>{link.shortLink}</td>
                            <td><Link to={`/detail/${link._id}`} >Подробнее </Link ></td>
                        </tr>

                    })}
                </tbody>
            </table>
        </div >
    )
}
