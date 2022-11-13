import React, { useRef, useState, useEffect } from "react"
import Profile from "./Profile.js"
import { Link , Navigate, useNavigate, useParams} from "react-router-dom"
import "../scss/components/_following.scss"
import {default as useAuth} from "./authContext"
import { db} from "../firebase"
import { collection, getDocs } from "firebase/firestore";


export default function Following() {
  const { currentUser } = useAuth()

  const [data2, setData2] = useState([])
  const [username, setUsername] = useState([])
  
  useEffect(() => {
    const donorsData = []
    setData2([])
    db
      .collection("user")
      .where("userID", "==", currentUser.uid.toString())
      .get()
      .then((results) => {
        results.forEach((doc) => {
          setUsername(doc.data().username)
          donorsData.push(doc.data().followers)
          // setData( arr => [...arr, doc.data().followers]);
        });
        // setData(donorsData);
        // console.log("donorsdata");
        console.log(donorsData[0])
        for(let i = 0; i<donorsData[0].length; i++) {
          const donorsData2 = []
          db
            .collection("user")
            .where("userID", "==", donorsData[0][i])
            .get()
            .then((result) => {
              result.forEach((docs) => {
                donorsData2.push(docs.data().firstName);
                setData2( arr => [...arr, docs.data().username])
              })
              
            })
        }
      })
  }, [])

  const renderList = data2.map((item) => 
  <div>
   <Link to={`/profile/${item}`} state={{from: {item}}}> {`@${item}`} </Link> 
  </div> 
  );


return  ( 
  <div className="following__div">
   {renderList}

</div>

  )
}
