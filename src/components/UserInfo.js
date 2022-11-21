import React, { useState, useEffect } from 'react'
import TextInput from './TextInput'
import { Select } from '@mantine/core'
import useAuth from '../components/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import { db } from '../firebase'
import {
	query,
	getDocs,
	collection,
	where,
	doc,
	updateDoc,
	arrayRemove, 
	arrayUnion
} from 'firebase/firestore'

export default function UserInfo({username, name, year, major, editable}) {
  let years = new Map([['2023', "4th Year"], ['2024', "3rd Year"], ['2025', "2nd Year"], ['2026', "1st Year"]]);

	const { currentUser } = useAuth()
  const [info, setInfo] = useState({
    firstName: 'Bobbie',
    lastName: 'Smith',
    gradYear: '2025',
    major1: 'Computer Science and Engineering',
    major2: '',
    major3: '',
    minor1: '',
    minor2: '',
    minor3: '',
    userId: 0,
    currentUsersFollowing: '',
    userId: '',
    username: ''
  })
  const renderListMajor = listMajor(info.major1, info.major2, info.major3)
  const renderListMinor = listMinor(info.minor1, info.minor2, info.minor3)

  useEffect(() => {
    async function fetchData() {
      const userQuery = query(collection(db, 'user'), where("username", "==", username))
      const snapshot = await getDocs(userQuery).catch((err) => { console.log(err) })
      if (snapshot == null) { console.log("error: no user login snapshot returned"); return }

      const currentUser = snapshot.docs[0].data()
      setInfo(prevFormData => ({
        ...prevFormData,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        gradYear: currentUser.year,
        major: currentUser.major1,
        userId: currentUser.userID,
        username: currentUser.username,
      }))  
    }

    if (info.userId === "") {
      fetchData()
    }

    const asyncFetchCurrentUserFollowers = async() => {
      const querySnapshot2 =  await getDocs(query(collection(db, "user"), where("userID", "==", currentUser.uid.toString())))
        querySnapshot2.forEach((doc) => {
        if(doc.data().followers.includes(info.userId.toString())) {
          setInfo(prevFormData => ({
            ...prevFormData,
            currentUsersFollowing: true,
          }))
        }
        });
      }
    asyncFetchCurrentUserFollowers();

  }, [info.userId])

  function setProperty(event) {
    const {name, value} = event.target
    setInfo(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }
  
function listMajor(major1, major2, major3) {
  if (major2 === "") {
    return <div className='user-info__name'>{`BS, ${major1}`}</div>
  }
  if (major2 !== "" && major3 === "") {
    return <div className='user-info__name'>{`BS, ${major1}, BS, ${major2}`}</div>
  }
  return (
    <div className='user-info__name'>{`BS, ${major1}, BS, ${major2}, BS, ${major3}`}</div>
  )
}

function listMinor(minor1, minor2, minor3) {
  if (minor1 === "") {
    return
  }
  if (minor2 === "") {
    return <div className='user-info__name'>{`Minor: ${minor1}`}</div>
  }
  if (minor2 !== "" && minor3 === "") {
    return <div className='user-info__name'>{`Minor: ${minor1}, ${minor2}`}</div>
  }
  return <div className='user-info__name'>{`Minor: ${minor1}, ${minor2}, ${minor3}`}</div>
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
          <div className='user-info__name'>{`@${info.username}`}</div>
          {renderListMajor}
          {renderListMinor}
          <div className='user-info__year'>{'Graduation year: ' + info.gradYear}</div>
        </>
      )}
    </div>
  )
}
