import React, { useState } from 'react'
import TextInput from './TextInput'
import { Select } from '@mantine/core'

export default function UserInfo({name, year, major, editable}) {
  let years = new Map([['2023', "4th Year"], ['2024', "3rd Year"], ['2025', "2nd Year"], ['2026', "1st Year"]]);

  const [info, setInfo] = useState({
    firstName: 'Bobbie',
    lastName: 'Smith',
    year: '2025',
    major: 'Computer Science and Engineering'
  })

  function setProperty(event) {
    const {name, value} = event.target
    setInfo(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  return (
    <div className='user-info'>
      {editable ? (
        <>
          <TextInput
            type='firstName'
            name='firstName'
            placeholder='First Name'
            value={info.firstName}
            handleChange={setProperty}
          />
          <TextInput
            type='lastName'
            name='lastName'
            placeholder='Last Name'
            value={info.lastName}
            handleChange={setProperty}
          />
          <Select
            name='year'
            placeholder='Graduation Year'
            searchable
            value={info.year}
            onChange={newVal => setProperty({
              target: {
                name: 'year',
                value: newVal
              }
            })}
            data={['2023', '2024', '2025', '2026']}
          />
          <TextInput
            type='major'
            name='major'
            placeholder='Major'
            value={info.major}
            handleChange={setProperty}
          />
        </>
      ) : (
        <>
          <div className='user-info__name'>{info.firstName + ' ' + info.lastName}</div>
          <div className='user-info__year'>{years.get(info.year)}</div>
          <div className='user-info__major'>{info.major}</div>
        </>
      )}
    </div>
  )
}
