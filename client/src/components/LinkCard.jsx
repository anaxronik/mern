import React from 'react'


export default function LinkCard(props) {
    return (
        <div>
            <h3>Сокращенная ссылка</h3>
            <p>ID ссылки: {props.link._id}</p>
            <p>Длинная ссылка:  <a href={props.link.longLink}>{props.link.longLink}</a> </p>
            <p>Короткая ссылка:  <a href={props.link.shortLink}>{props.link.shortLink}</a> </p>
            <p>Дата создания: <strong>{new Date(props.link.date).toLocaleDateString()}</strong></p>
            <p>Колличество кликов: {props.link.cliks}</p>
        </div>
    )
}
