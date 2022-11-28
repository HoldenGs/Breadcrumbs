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
    currentUsersFollowing: false,
    userId: '',
    username: '',
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
    async function fetchData() {
      const userQuery = query(collection(db, 'user'), where("username", "==", username))
      const snapshot = await getDocs(userQuery).catch((err) => { console.log(err) })
      if (snapshot === null) { console.log("error: no user login snapshot returned"); return }
      const currUser = snapshot.docs[0].data()
      setInfo(prevFormData => ({
        ...prevFormData,
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        gradYear: currUser.gradYear,
        userId: currUser.userID,
        username: currUser.username,
        majors: currUser.majors,
        minors: currUser.minors,
      }))
      if(currUser.followers.includes(currentUser.uid.toString())) {
        setInfo(prevFormData => ({
          ...prevFormData,
          currentUsersFollowing: true,
        }))
      }  
    }

    if (info.userId === "") {
      fetchData()
    }
  }, [info.userId])

  function setProperty(event) {
    const {name, value} = event.target
    setInfo(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))

    const asyncUpdateInfo = async() => {
      const querySnapshot2 =  await getDocs(query(collection(db, "user"), where("userID", "==", currentUser.uid.toString())))
        querySnapshot2.forEach((docs) => {
        const ref = doc(db, "user", docs.id)
        updateDoc(ref, {
          [name]: value
          })
        })
      }
      asyncUpdateInfo();
  }

  function handleSelectChange(name, value) {
    setInfo(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))

    const asyncUpdateStudies = async() => {
      const querySnapshot2 =  await getDocs(query(collection(db, "user"), where("userID", "==", currentUser.uid.toString())))
        querySnapshot2.forEach((docs) => {
          const ref = doc(db, "user", docs.id)
          updateDoc(ref, {
            [name]: value
            })
        })
    }
    asyncUpdateStudies()
  }

  
function listMajor(majors) {
  if (typeof majors === 'undefined') {
    return
  }
  if (majors.length === 1) {
    return <div className='user-info__name'>{`BS, ${majors[0]}`}</div>
  }
  if (majors.length === 2) {
    return <div className='user-info__name'>{`BS, ${majors[0]}, BS, ${majors[1]}`}</div>
  }
  return (
    <div className='user-info__name'>{`BS, ${majors[0]}, BS, ${majors[1]}, BS, ${majors[2]}`}</div>
  )
}

function listMinor(minors) {
  if (typeof minors === 'undefined') {
    return
  }
  if (minors.length === 1) {
    return <div className='user-info__name'>{`Minor: ${minors[0]}`}</div>
  }
  if (minors.length === 2) {
    return <div className='user-info__name'>{`Minor: ${minors[0]}, ${minors[1]}`}</div>
  }
  return <div className='user-info__name'>{`Minor: ${minors[0]}, ${minors[1]}, ${minors[2]}`}</div>
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
          <button onClick={() => {navigator.clipboard.writeText(`${window.location.host}profile/${username}`)}}>
            Share
          </button>
        </>
      )}
    </div>
  )
}
