import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import { useLocation } from "react-router-dom"
import { db } from "../firebase"
import { collection, getDocs, where, query } from "firebase/firestore"

export default function Following() {
  const [following, setFollowing] = useState([])
  const location = useLocation()
  const [id, setID] = useState(location.state ? location.state.userID : null)
  const username = location.pathname.split("/").at(-1) // /following/:username

  // on load, if no ID, fetch that. then fetch all followers.
  useEffect(() => {
    const asyncFetchFollowing = async() => {
      if (!id) {
        const userSnapshot = await getDocs(query(collection(db, "user"), where("username", "==", username)))
        setID(userSnapshot.docs[0].data().userID)
      }

      const querySnapshot = await getDocs(query(collection(db, "user"), where("followers", 'array-contains', id)))
      querySnapshot.docs.forEach(doc => {
        setFollowing(arr => [...arr, doc.data()])
      })
    }

    asyncFetchFollowing()
  }, [username, id])
  
  return (
    <div className='following'>
      <Header username={username} id={id}/>
      <h1 className="following--name">@{username}: following</h1>
      {following.map((usr) => (
        <ProfileCard
          name={usr.firstName + ' ' + usr.lastName}
          gradYear={usr.gradYear}
          major={usr.majors ? usr.majors[0] : null}
        />
      ))}
      <ProfileCard />
    </div>
  )
}
