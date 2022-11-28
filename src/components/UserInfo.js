import React, { useState, useEffect } from 'react'
import TextInput from './TextInput'
import { Select, MultiSelect } from '@mantine/core'
import useAuth from '../components/AuthContext'
import { db } from '../firebase'
import {
	query,
	getDocs,
	collection,
	where,
	doc,
	updateDoc,
} from 'firebase/firestore'

export default function UserInfo({username, editable}) {
  let years = new Map([['2023', "4th Year"], ['2024', "3rd Year"], ['2025', "2nd Year"], ['2026', "1st Year"]])
  const { currentUser } = useAuth()
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    gradYear: '',
    majors: [],
    minors: [],
    loggedInUserFollowing: '',
    userId: '',
    username: '',
    docID: '',
  })

  const renderListMajor = listMajor(info.majors)
  const renderListMinor = listMinor(info.minors)

  //remove this eventually 
  const majors = [
    'Sociology',
    'Computer Science and Engineering',
    'Microbiology, Immunology, and Molecular Genetics',
    'Independent Studies'
  ]
  const minors = [
    'Sociology',
    'Computer Science and Engineering',
    'Microbiology, Immunology, and Molecular Genetics',
    'Independent Studies'
  ]

  useEffect(() => {
    const fetchData = async () => {
      const userQuery = query(collection(db, 'user'), where("username", "==", username))
      const snapshot = await getDocs(userQuery).catch((err) => { console.log(err) })

      if (!snapshot || !snapshot.docs[0]) {
        console.error("error: no user login snapshot returned")
        return
      }

      const profileUser = snapshot.docs[0].data()
      const docID = snapshot.docs[0].id

      setInfo(prevFormData => ({
        ...prevFormData,
        firstName: profileUser.firstName,
        lastName: profileUser.lastName,
        gradYear: profileUser.gradYear,
        userId: profileUser.userID,
        username: profileUser.username,
        majors: profileUser.majors,
        minors: profileUser.minors,
        loggedInUserFollowing: profileUser.followers.includes(currentUser.uid),
        docID,
      }))
    }

    if (!info.userId)
      fetchData()
  }, [info.userId, currentUser.uid, username])

  function setProperty(event) {
    const {name, value} = event.target
    setInfo(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))

    const ref = doc(db, "user", info.docID)
    updateDoc(ref, {
      [name]: value
    })
  }

  function handleSelectChange(name, value) {
    setInfo(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))

    const ref = doc(db, "user", info.docID)
    updateDoc(ref, {
      [name]: value
    })
  }

  
function listMajor(majors) {
  if (!majors || majors.length === 0)
    return
  
  return (
    <div className='user-info__name'>{`${majors.join(', ')}`}</div>
  )
}

function listMinor(minors) {
  if (!minors || minors.length === 0)
    return
  
  return <div className='user-info__name'>{`Minor: ${minors.join(', ')}`}</div>
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
          <TextInput
            type='username'
            name='username'
            placeholder='username'
            value={info.username}
            handleChange={setProperty}
          />
          <Select
            name='year'
            placeholder='Graduation Year'
            searchable
            value={info.year}
            onChange={value => handleSelectChange('gradYear', value)}
            data={['2023', '2024', '2025', '2026']}
          />
          <MultiSelect
          placeholder='Major'
          searchable
          nothingFound='Invalid Major'
          data={majors}
          value={info.majors}
          onChange={value => handleSelectChange('majors', value)}
          required
          maxSelectedValues={3}
        />
        <MultiSelect
          placeholder='Minor'
          searchable
          nothingFound='Invalid Minor'
          data={minors}
          value={info.minors}
          onChange={value => handleSelectChange('minors', value)}
          required
          maxSelectedValues={3}
        />
        </>
      ) : (
        <>
          <div className='user-info__name'>{`${info.firstName} ${info.lastName}`}</div>
          <div className='user-info__name'>{`@${info.username}`}</div>
          {renderListMajor}
          {renderListMinor}
          <div className='user-info__year'>{years.get(info.gradYear)}</div>
          <button onClick={() => {navigator.clipboard.writeText(`${window.location.host}/profile/${username}`)}}>
            Share
          </button>
        </>
      )}
    </div>
  )
}
