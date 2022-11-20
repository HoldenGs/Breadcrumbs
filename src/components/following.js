import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../scss/components/_following.scss"
import {default as useAuth} from "./AuthContext"
import { useLocation} from "react-router-dom"
import { db} from "../firebase"
import { collection, getDocs, where, query } from "firebase/firestore";

export default function Following() {
  const { currentUser } = useAuth()
  const location = useLocation()
  const {from} = location.state
  const user = Object.values(from).toString()

  const [following, setFollowing] = useState([])
  
  useEffect(() => {

    setFollowing([])
    const asyncFetchDailyData = async() => {
      const followingIDs = []
      const querySnapshot =  await getDocs(query(collection(db, "user"), where("username", "==", user)))
      querySnapshot.forEach((doc) => {
        followingIDs.push(doc.data().followers)
        });
        for(let i = 0; i<followingIDs[0].length; i++) {
          const followingUsernames = []
          const asyncFetchDailyData2 = async() => {
            const querySnapshot =  await getDocs(query(collection(db, "user"), where("userID", "==", followingIDs[0][i])))
            querySnapshot.forEach((doc) => {
              followingUsernames.push(doc.data().firstName);
              setFollowing( arr => [...arr, doc.data().username])
              });
          }
          asyncFetchDailyData2();
        }
      }
      asyncFetchDailyData();
  }, [])

  

  const renderList = following.map((username) => 
  <div>
   <Link to={`/profile/${username}`} state={{from: {username}}}> {`@${username}`} </Link> 
  </div> 
  );


return  ( 
  <div className="following__div">
   {renderList}

</div>

  )
}