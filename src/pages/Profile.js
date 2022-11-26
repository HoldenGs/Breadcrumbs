import { React, useState, useEffect } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'
import {useLocation} from 'react-router-dom'
import useAuth from '../components/AuthContext'
import { db } from '../firebase'
import {
	query,
	getDocs,
	collection,
	where,
} from 'firebase/firestore'

export default function Profile() {
  const [editable, setEditable] = useState(false)
  const quarters = ['Fall 2022', 'Spring 2022', 'Winter 2022', 'Fall 2021']

  const { currentUser } = useAuth()
  const [id, setID] = useState('')
  const location = useLocation()
	const userNameState = location.pathname.split("/").at(-1)
  const renderEditProfile = editProf(currentUser.uid.toString(), id)

  useEffect(() => {
    const asyncFetchDailyData = async() => {
      const querySnapshot =  await getDocs(query(collection(db, "user"), where("username", "==", userNameState)))
      querySnapshot.forEach((doc) => {
        setID(doc.data().userID)
        });
      }
      asyncFetchDailyData();
  }, [])

  //can't edit another user's profile
  function editProf(currentUserID, id) {
    if (currentUserID !== id)
      return
    return (
      <Button text={editable ? 'Save' : 'Edit'} handleClick={() => setEditable(!editable)} />
    )
  }

  return (
    <div className='profile'>
      <Header username = {userNameState}/>
      <UserInfo username = {userNameState} editable={editable} />
      {/* <Button text={editable ? 'Save' : 'Edit'} handleClick={() => setEditable(!editable)} /> */}
      {renderEditProfile}
      {quarters.map((quarter) => <Quarter key={quarter} name={quarter} editable={editable} />)}
    </div>
  )
}
