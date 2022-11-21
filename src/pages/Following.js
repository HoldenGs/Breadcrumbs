import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import { useLocation} from "react-router-dom"
import { db} from "../firebase"
import { collection, getDocs, where, query } from "firebase/firestore"

export default function Following() {
  const [following, setFollowing] = useState([])
  const location = useLocation()
  const { username } = location.state

  useEffect(() => {
    setFollowing([])
    const asyncFetchDailyData = async() => {
      const followingIDs = []
      const querySnapshot =  await getDocs(query(collection(db, "user"), where("username", "==", username)))
      querySnapshot.forEach((doc) => {
        followingIDs.push(doc.data().followers)
        })
        for(let i = 0; i<followingIDs[0].length; i++) {
          const asyncFetchDailyData2 = async() => {
            const querySnapshot =  await getDocs(query(collection(db, "user"), where("userID", "==", followingIDs[0][i])))
            querySnapshot.forEach((doc) => {
              setFollowing( arr => [...arr, doc.data()])
            })
          }
          asyncFetchDailyData2()
        }
      }
      asyncFetchDailyData()
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
