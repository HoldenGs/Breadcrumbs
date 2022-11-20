import React, { useState } from 'react'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'

export default function Profile() {
  const[quarters, setQuarters] = useState(['Fall 2022', 'Spring 2022', 'Winter 2022', 'Fall 2021'])

  return (
    <div className='profile'>
      <Header />
      <UserInfo name='Bobbie Smith' />
      {quarters.map((quarter) => <Quarter quarterName={quarter} />)}
    </div>
  )
}
