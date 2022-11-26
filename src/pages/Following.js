import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import { useLocation } from "react-router-dom"
import { db } from "../firebase"
import { collection, getDocs, where, query } from "firebase/firestore"

export default function Following() {
  const [following, setFollowing] = useState([])
  const location = useLocation()
  const { userID } = location.state
  const [username, setUserName] = useState([])

  useEffect(() => {
    setFollowing([])
    const asyncFetchFollowing = async() => {
      const querySnapshot =  await getDocs(query(collection(db, "user"), where("followers", 'array-contains', userID)))
      querySnapshot.forEach((doc) => {
        setFollowing( arr => [...arr, doc.data()])  
        })
      }
      asyncFetchFollowing()
      const asyncFetchUsername = async() => {
        const querySnapshot =  await getDocs(query(collection(db, "user"), where("userID", "==", userID)))
        querySnapshot.forEach((doc) => {
          setUserName(doc.data().username)
          })
        }
        asyncFetchUsername()
  }, [])
  
  return (
    <div className='following'>
      <Header username = {username}/>
      {following.map((usr) => (
        <ProfileCard
          name={usr.firstName + ' ' + usr.lastName}
          year={usr.year}
          major={usr.major1}
        />
      ))}
      <ProfileCard />
    </div>
  )
}
