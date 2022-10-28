import React from 'react'

export default function UserInfo({name, highlightedReview}) {

    return (
        <div className='user-info'><div className='user-info__name'>{name}</div>
        <div className='user-info__review'>{highlightedReview}</div>
        </div>
    )
}
