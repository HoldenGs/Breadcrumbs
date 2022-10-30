import React from "react"
import "../scss/components/_update-profile.scss"
import Profile from "./profile"
import { Link, useHistory } from "react-router-dom"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

export let nameFirst = ""
export let nameLast = ""
export let email = ""
export let major = ""
export let username = ""
export let minor = ""
export let bio = ""

export default function UpdateProfile() {
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
    
    function handleChange(event) {
        console.log(event.target.value)
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit() {
        nameFirst = formData.firstName
        nameLast = formData.lastName
        email = formData.email
        major = formData.major
        username = formData.username
        minor = formData.minor
        bio = formData.bio
        return (
            <Link to="profile">
                hello
            </Link>
        ) 
    }

    
    return (
        <body>
            <h2 className = "update-profile__h2"><a className = "update-profile__a" href="/profile"> Profile </a> <a className = "update-profile__a" href="/following"> {"   "}Following </a></h2>

            <form className="update-profile__form">
            <label id="update-profile__label"> First Name</label> <input className="update-profile__input"
                type="text"
                id="message"
                onChange={handleChange}
                placeholder="Leave blank to keep the same"
                name="firstName"
                value={formData.firstName}
            />
            <label> Last Name</label> <input className="update-profile__input"
                type="text"
                id="message"
                onChange={handleChange}
                placeholder="Leave blank to keep the same"
                name="lastName"
                value={formData.lastName}
            />
            <br />

            <label> Username </label><input className="update-profile__input"
                type="text"
                id="message"
                onChange={handleChange}
                placeholder="Leave blank to keep the same"
                name="username"
                value={formData.username}
            />
            <br />
            <label> Email</label><input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <label> Password</label><input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />

            <br />
            
            <fieldset className = "update-profile__fieldset">
                <legend className = "update-profile__legend">Academic Year</legend>
                <input 
                    type="radio"
                    id="year"
                    name="year"
                    value="year"
                    onChange={handleChange}
                />
                <label htmlFor="first">First</label>
                <br />
                
                <input  
                    type="radio"
                    id="year"
                    name="year"
                    value="Second"
                    onChange={handleChange}
                />
                <label htmlFor="second">Second</label>
                <br />
                
                <input 
                    type="radio"
                    id="year"
                    name="year"
                    value="Third"
                    onChange={handleChange}
                />
                <label htmlFor="third">Third</label>
                <br />

                <input 
                    type="radio"
                    id="year"
                    name="year"
                    value="Second"
                    onChange={handleChange}
                />
                <label htmlFor="fourth">Fourth</label>
               
            </fieldset>
            <br />
            <label> Major</label><input className="update-profile__input"
                type="text"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="major"
                value={formData.major}
            />
            <br />
            <label> Minor</label><input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="minor"
                value={formData.minor}
            />
            <br />
            <br />
            <label> Bio</label>
            <br />
            <textarea 
            rows = "5"
            cols = "97"
                type="text"
                //value={formData.bio}
              //  id="update-profile__textarea"
                placeholder="Briefly describe any additional academic and/or extracurricular commitment you'd like to share."
               onChange={handleChange}
            />
             
<Link to="/profile">
<br />
                <button className="update-profile__button" onClick={handleSubmit}>
                    Save
                </button>
                </Link>

            </form>
            <br />
            </body>

    )
}
