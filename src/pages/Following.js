import React, { useEffect, useState } from 'react'
import UserInfo from '../components/UserInfo'
import { collection, getDocs } from 'firebase/firestore'
import { Loader } from '@mantine/core'
import { useRef } from 'react'


export default function Following({ db }) {

    const [users, setUsers] = useState(null);
    const refreshUsers = useRef(true);

    useEffect(() => {
        if (refreshUsers) {
            const userID = ""
            const usersCol = collection(db, 'user')
            getDocs(usersCol).then((snapshot) => {
                    setUsers(snapshot.docs.map((doc) => doc.data()))
                })
        }
        refreshUsers.current = false
    })

    if (!users) {
        return (
            <div>
                <Loader color="yellow" />
            </div>
        )
    } else {
        return (
            <div>
            <p>"Test!"</p>
                <div>
                {users.map(function(obj, i) {
                    if (!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)) {
                        return <UserInfo key={obj.userID} name={obj.firstName + " " + obj.lastName} highlightedReview={"object.highlightedReview"} />
                    } else { return null }
                })}
                </div>
            </div>
        )
    }
}
