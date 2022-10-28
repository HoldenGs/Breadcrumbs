import React from "react"
import "../scss/components/form.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./profile"

export default function Form() {
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
        }
    )
    const [isPreviewShown, setPreviewShown] = React.useState(false);
    
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

    function handlePreview(e) {
        e.preventDefault();
        setPreviewShown(true);

    }

    
    return (
        <div>
            <h2 className="text-center mb-4"> <a href="/profile"> Profile </a> <a href="/following"> {"   "}Following </a></h2>
        <form>
            <input
                type="text"
                id="message"
                placeholder="First Name"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
            />
            <input
                type="text"
                id="message"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
            />
            <br />

            <input
                type="text"
                id="message"
                placeholder="Username"
                onChange={handleChange}
                name="username"
                value={formData.username}
            />
            <br />
            <input
                type="text"
                id="message"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <input
                type="text"
                id="message"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />

            <br />
            <br />
            
            <fieldset>
                <legend>Academic Year</legend>
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
                <br />
            </fieldset>
            <input
                type="text"
                placeholder="Major"
                onChange={handleChange}
                name="major"
                value={formData.major}
            />
            <br />
            <input
                type="text"
                id="message"
                placeholder="Minor"
                onChange={handleChange}
                name="minor"
                value={formData.minor}
            />
            <br />
            <br />
            <textarea 
                value={formData.bio}
                id="message"
                placeholder="Biography"
                onChange={handleChange}
                name="biography"
            />

<button type="Submit" onClick={handlePreview}>Save</button>
 {isPreviewShown && <Profile2 firstname={formData.firstName}
lastname={formData.lastName}
email={formData.email}
year={formData.year}
username={formData.username}
password={formData.password}
major={formData.major}
minor={formData.minor}
bio={formData.bio}

>
    </Profile2>} 

         </form>
         </div>

    )
}

const Profile2=({firstname, lastname, email, year, username, password, major, minor, bio}) => {
    console.log(firstname)
    const [formData2, setFormData2] = React.useState(
        {
            firstName2: "", 
            lastName2: "", 
            email2: "", 
            year2: "",
            username2: "",
            password2: "",
            major2: "",
            minor2: "",
            bio2: "",

        }
    )

    const [isPreviewShown2, setPreviewShown2] = React.useState(false);

    function changeStates() {
        //console.log("hi")
        if(firstname!=undefined)
            formData2.firstName2= firstname
        if(lastname!=undefined)
            formData2.lastName2= lastname
        if(email!=undefined)
            formData2.email2= email
        if(year!=undefined)
            formData2.year2= year
        if(username!=undefined)
            formData2.username2= username
        if(password!=undefined)
            formData2.password2= password
        if(major!=undefined)
            formData2.major2= major
        if(minor!=undefined)
            formData2.minor2= minor
        if(bio!=undefined)
            formData2.bio2= bio
        setPreviewShown2(true);
        
        console.log("the new states are")
        console.log(formData2.firstName2)
        console.log(formData2.lastName2)
        console.log(formData2.email2)
        console.log(formData2.year2)
        console.log(formData2.username2)
        console.log(formData2.password2)
        console.log(formData2.major2)
        console.log(formData2.minor2)
        console.log(formData2.bio2)
    }

    if(firstname==undefined) {
        return(
            <h1>
                Testing/placeholder
            </h1>
        )
    }

    return (
        <div>
        {changeStates()}
        <Router>
            <Route path="/profile" component={Profile} />
        </Router>
    </div>
    )

}
