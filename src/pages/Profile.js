import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'
import {useLocation} from 'react-router-dom'

export default function Profile() {
  const [editable, setEditable] = useState(false)
  const quarters = ['Fall 2022', 'Spring 2022', 'Winter 2022', 'Fall 2021']
  
  const location = useLocation()
	const userNameState = location.pathname.split("/").at(-1)

  return (
    <div className='profile'>
      <Header username = {userNameState}/>
      <UserInfo username = {userNameState} name='Bobbie Smith' year={2} major='Computer Science and Engineering' editable={editable} />
      <Button text={editable ? 'Save' : 'Edit'} handleClick={() => setEditable(!editable)} />
      {quarters.map((quarter) => <Quarter key={quarter} name={quarter} editable={editable} />)}
    </div>
  )
}
