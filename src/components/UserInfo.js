import React from 'react'

export default function UserInfo() {

    let name = 'Nathan Fielder'

    let highlightedReview = 'Tried the latest professor for 35L. He makes some GREAT jokes in-class.'
    return (
        <div><div className='name'>{name}</div>
        <br></br>
        <div className='firstReview'>{highlightedReview}</div>
        </div>
    )
}
