import React, { useRef, useState } from "react"
import "../scss/components/_profile.scss"
import {default as useAuth} from "./authContext"


export default function Profile() {

  return ( <div className="div">
    <h2 className = "profile__h2"><a className = "profile__a" href="/update-profile"> Update Profile </a> <a className = "profile__a" href="/following"> {"   "}Following </a></h2>
</div>
  )
}
