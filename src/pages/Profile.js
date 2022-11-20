import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'

export default function Profile() {
  const [editable, setEditable] = useState(false)
  const[quarters, setQuarters] = useState(['Fall 2022', 'Spring 2022', 'Winter 2022', 'Fall 2021'])

  return (
    <div className='profile'>
      <Header />
      <UserInfo name='Bobbie Smith' />
      <Button text={editable ? 'Save' : 'Edit'} handleClick={() => setEditable(!editable)} />
      {quarters.map((quarter) => <Quarter key={quarter} name={quarter} editable={editable} />)}
    </div>
  )
}
