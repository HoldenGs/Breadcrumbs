import React, { useRef, useState, useEffect } from "react"
import { Link , Navigate, useNavigate, useParams, useLocation} from "react-router-dom"
import "../scss/components/_profile.scss"
import {default as useAuth} from "./authContext"
import { db} from "../firebase"
import { collection, getDocs , arrayUnion} from "firebase/firestore";

export default function Profile() {

  const { currentUser } = useAuth()
  const location = useLocation()
  const {from} = location.state
  const user = Object.values(from).toString();
  console.log("user")
  console.log(user)


const [first, setFirst] = useState([])
const [last, setLast] = useState([])
const [username, setUsername] = useState([])
const [year, setYear] = useState([])
const [major1, setMajor1] = useState([])
const [major2, setMajor2] = useState([])
const [major3, setMajor3] = useState([])
const [minor1, setMinor1] = useState([])
const [minor2, setMinor2] = useState([])
const [minor3, setMinor3] = useState([])
const [userId, setUserId] = useState([])


  
  useEffect(() => {
    setFirst("")
    setLast("")
    setUsername("")
    setYear("")
    setMajor1("")
    setMajor2("")
    setMajor3("")
    setMinor1("")
    setMinor2("")
    setMinor3("")
    setUserId("")
    db
      .collection("user")
      .where("username", "==", user)
      .get()
      .then((results) => {
        results.forEach((doc) => {
          setFirst(doc.data().firstName)
          setLast(doc.data().lastName)
          setUsername(doc.data().username)
          setYear(doc.data().year)
          setMajor1(doc.data().major1)
          setMajor2(doc.data().major2)
          setMajor3(doc.data().major3)
          setMinor1(doc.data().minor1)
          setMinor2(doc.data().minor2)
          setMinor3(doc.data().minor3)
          setUserId(doc.data().userID)
          console.log("userID")
          console.log(doc.data().userID)
          })

        });

      
  }, [])

  function func(major1, major2, major3) {
    if(major2=="") {
      return  <h3>{`${year} year - BS, ${major1}`}</h3>
    }
    if(major2!="" && major3=="") {
      return  <h3>{`${year} year - BS, ${major1}, BS, ${major2}`}</h3>
    }
      return  <h3>{`${year} year - BS, ${major1}, BS, ${major2}, BS, ${major3}`}</h3>   
  }

  function func2(minor1, minor2, minor3) {
    if(minor1=="") {
      return;
    }
    if(minor2=="") {
      return  <h3>{`Minor: ${minor1}`}</h3>
    }
    if(minor2!="" && minor3=="") {
      return  <h3>{`Minor: ${minor1}, ${minor2}`}</h3>
    }
    return  <h3>{`Minor: ${minor1}, ${minor2}, ${minor3}`}</h3>      
  }

  function handleFollow(idOne, idTwo) {
    if(currentUser!=null)
    idOne = currentUser.uid.toString()
    console.log(userId)
    console.log(currentUser.uid.toString())
    if(userId==currentUser.uid.toString() || userId==0)
      return;
    db.collection("user").where("userID", "==", idOne)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            //todo: make the option for if user wants to delete a major/minor/bio
                db.collection("user").doc(doc.id.toString()).update({
                    followers: arrayUnion(idTwo),
                });
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
      return (
        <button className="profile__button" onClick={handleFollow}>
        Follow
        </button>
      )


  }

  const renderListMajor = func(major1, major2, major3)
  const renderListMinor = func2(minor1, minor2, minor3)
  const renderHandleFollow = handleFollow(user, userId)
  console.log(currentUser);

  return  ( 
  <div className="div">

     {renderHandleFollow}

    <h2 className = "profile__h2"><a className = "profile__a" href="/update-profile"> Update Profile </a> <a className = "profile__a" href="/following"> {"   "}Following </a></h2>
      <h1 className = "profile__h1"> {`${first} ${last}`}</h1>
      <h2>{`@${username}`}</h2>
      <h3>{renderListMajor}</h3>
      <h4>{renderListMinor}</h4>

</div>

  )
}
