import React, { useRef, useState } from "react"
import UpdateProfile from "./updateProfile.js"
import { Link, useHistory } from "react-router-dom"
import "../scss/components/_profile.scss"
import {nameFirst, nameLast, email, major, username, minor, bio} from './updateProfile'

export default function Profile() {
  //replace this with firestore data 
  const [formData, setFormData] = React.useState(
    {
        firstName: "", 
        lastName: "", 
        email: "", 
        year: "",
        username: "",
        password: "",
        major: "",
        minor: "",
        bio: "",
        finished: false,
    }
)
    if(nameFirst!=formData.firstName) {
      formData.firstName = nameFirst
    }

  return ( <div className="div">
    <h2 className = "profile__h2"><a className = "profile__a" href="/update-profile"> Update Profile </a> <a className = "profile__a" href="/following"> {"   "}Following </a></h2>
  <h1>{nameFirst} {nameLast}</h1>
  <p class="title">{username}</p>
  <p>{major}</p>
  <p>{minor}</p>
  <p>{bio}</p>
</div>
  )
}
