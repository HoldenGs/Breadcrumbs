import React from 'react'

export default function ProfileCard({name, year, major, highlightedReview}) {
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

  return (
    <div className='profile-card'>
      <div className='profile-card__name'>{name}</div>
      <div className='profile-card__year'>{years[year-1]}</div>
      <div className='profile-card__major'>{major}</div>
      <div className='profile-card__review'>{highlightedReview}</div>
    </div>
  )
}
