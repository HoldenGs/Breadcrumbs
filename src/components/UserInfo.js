import React from 'react'

export default function UserInfo({name, year, major}) {
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

  return (
    <div className='user-info'>
      <div className='user-info__name'>{name}</div>
      <div className='user-info__year'>{years[year-1]}</div>
      <div className='user-info__major'>{major}</div>
    </div>
  )
}
