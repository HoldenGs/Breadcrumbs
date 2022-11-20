import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../scss/components/_profile.scss'
import { default as useAuth } from './AuthContext'
import { db } from '../firebase'
import { arrayRemove, arrayUnion } from 'firebase/firestore'
import {
	query,
	getDocs,
	collection,
	where,
	doc,
	updateDoc
} from 'firebase/firestore'

export default function Profile({ state }) {
	const { currentUser } = useAuth()
	const location = useLocation()
	const user = location.state
	//const user = Object.values(currentUser).toString()
	console.log(location.pathname.split("/").at(-1))
	const userNameState = location.pathname.split("/").at(-1)

	const [first, setFirst] = useState([])
	const [last, setLast] = useState([])
	const [username, setUsername] = useState("")
	const [year, setYear] = useState("")
	const [major1, setMajor1] = useState("")
	const [major2, setMajor2] = useState("")
	const [major3, setMajor3] = useState("")
	const [minor1, setMinor1] = useState("")
	const [minor2, setMinor2] = useState("")
	const [minor3, setMinor3] = useState("")
	const [userId, setUserId] = useState("")
	const [currentUsersFollowing, setCUF] = useState([])
const [firestoreDocIDforCurrUser, setFDCU] = useState([])

	useEffect(() => {

		async function fetchData() {

			const userQuery = query(collection(db, 'user'), where("username", "==", location.pathname.split("/").at(-1)))
			const snapshot = await getDocs(userQuery).catch((err) => { console.log(err) })
			if (snapshot == null) { console.log("error: no user login snapshot returned"); return }

			console.log("userId: " + userId)
			const currentUser = snapshot.docs[0].data()
			setFirst(currentUser.firstName); setLast(currentUser.lastName)
			setUsername(currentUser.username); setYear(currentUser.year)
			setMajor1(currentUser.major1); setMajor2(currentUser.major2); setMajor3(currentUser.major3)
			setMinor1(currentUser.minor1); setMinor2(currentUser.minor2); setMinor3(currentUser.minor3)
			setUserId(currentUser.userID)
			console.log(currentUser.userID)
		
		}

		console.log(userId)

		if (userId === "") {
			fetchData()
		}
		const asyncFetchCurrentUserFollowers = async() => {
			const querySnapshot2 =  await getDocs(query(collection(db, "user"), where("userID", "==", currentUser.uid.toString())))
			  querySnapshot2.forEach((doc) => {
				if(doc.data().followers.includes(userId.toString())) {
				  setCUF(true)
				}
				// setCUF(doc.data().followers)
				});
		  }
		
		  asyncFetchCurrentUserFollowers();
		
	}, [user, userId, location.pathname])

	function listMajor(major1, major2, major3) {
		if (major2 === "") {
			return <h3>{`${year} year - BS, ${major1}`}</h3>
		}
		if (major2 !== "" && major3 === "") {
			return <h3>{`${year} year - BS, ${major1}, BS, ${major2}`}</h3>
		}
		return (
			<h3>{`${year} year - BS, ${major1}, BS, ${major2}, BS, ${major3}`}</h3>
		)
	}

	function listMinor(minor1, minor2, minor3) {
		if (minor1 === "") {
			return
		}
		if (minor2 === "") {
			return <h4>{`Minor: ${minor1}`}</h4>
		}
		if (minor2 !== "" && minor3 === "") {
			return <h4>{`Minor: ${minor1}, ${minor2}`}</h4>
		}
		return <h4>{`Minor: ${minor1}, ${minor2}, ${minor3}`}</h4>
	}

	function handleUnfollow(userIDToUnfollow) {
		const asyncFetchData = async() => {
		  const querySnapshot2 =  await getDocs(query(collection(db, "user"), where("userID", "==", currentUser.uid.toString())))
			querySnapshot2.forEach((doc) => {
			  setFDCU(doc.id)
			  }
			)}
			  asyncFetchData();
			const unfollow = async() => {
			  console.log(firestoreDocIDforCurrUser)
			  const ref = doc(db, "user", firestoreDocIDforCurrUser)
			   await updateDoc(ref, {
				followers: arrayRemove(userIDToUnfollow.toString())
			})
			}
			unfollow();
	  }
	
	  function handleFollow(userIDToFollow) {
		const asyncFetchData = async() => {
		  const querySnapshot2 =  await getDocs(query(collection(db, "user"), where("userID", "==", currentUser.uid.toString())))
			querySnapshot2.forEach((doc) => {
			  setFDCU(doc.id)
			  }
			)}
			  asyncFetchData();
	
			const follow = async() => {
			  console.log(firestoreDocIDforCurrUser)
			  const ref2 = doc(db, "user", firestoreDocIDforCurrUser)
			   await updateDoc(ref2, {
				followers: arrayUnion(userIDToFollow.toString())
			})
			}
			follow();
	  }

	function followBtn(currUserId, userToFollow) {
		if (currentUser != null) currUserId = currentUser.uid.toString()
		if (userToFollow === currentUser.uid.toString() || userToFollow === 0) {
			console.log("hey")
	return
  }
  else if(currentUsersFollowing===true) {
	return (
	  <button className="profile__button" onClick={handleUnfollow(userId)}>
	  Unfollow
	  </button>
	)
  }
  else {
	return (
	<button className="profile__button" onClick={handleFollow(userId)}>
	  Follow
	</button>
  )
}
}

	const renderListMajor = listMajor(major1, major2, major3)
	const renderListMinor = listMinor(minor1, minor2, minor3)
	const renderHandleFollow = followBtn(currentUser.uid.toString(), userId)

	return (
		<div className="div">
			{renderHandleFollow}

			<h2 className="profile__h2">
				<a className="profile__a" href="/update-profile">
					{" "}
					Update Profile{" "}
				</a>{" "}
				<Link to={`/following`} state={{from: {userNameState}}} > Following </Link>
				<button onClick={() => {navigator.clipboard.writeText(`${window.location.href}`)}}>
                   Share
               </button>
			</h2>
			<h1 className="profile__h1"> {`${first} ${last}`}</h1>
			<h2>{`@${username}`}</h2>
			{renderListMajor}
			{renderListMinor}
		</div>
	)
}

