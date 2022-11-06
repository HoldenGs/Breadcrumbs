import {useState} from "react"
import "../scss/components/_create-profile.scss"
import Profile from "./Profile"
import { Link, useHistory } from "react-router-dom"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {db, auth} from "../firebase"
import {collection, addDoc, serverTimestamp, getDocs,getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

export default function CreateProfile() {
    const [formData, setFormData] = useState(
        {
            firstName: "", 
            lastName: "", 
            email: "", 
            year: "",
            username: "",
            password: "",
            bio: "",
            finished: false,
            userID: 0,
            save: "",
            major1: "",
            major2: "",
            major3: "",
            minor1: "",
            minor2: "",
            minor3: "",               
        }
    )

    
    function handleChange(event) {
        //console.log(event.target.value)
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })

    }

    function handleSubmit() {
        const usersColRef = collection(db, 'user')
        if(document.querySelector('input[name="year"]:checked')!=null)
            formData.year = document.querySelector('input[name="year"]:checked').value

        auth.createUserWithEmailAndPassword(formData.email, formData.password)
   .then(data => {  
      console.log("USER'S IDENTITY :- ", data.user.uid);
      console.log(formData.save);
        db.collection("user").doc(formData.save).update({
            userID: data.user.uid,   
        });
   })
   console.log("then onto addDoc");
   console.log(formData.major2)
        addDoc(usersColRef, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            year: formData.year,
            username: formData.username,
            bio: formData.bio,
            createdAt: serverTimestamp(),
            minor1: formData.minor1,
            minor2: formData.minor2,
            minor3: formData.minor3,
            userID: formData.userID,
            major1: formData.major1,
            major2: formData.major2,
            major3: formData.major3,
            loggedIn: serverTimestamp(),
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            formData.save = docRef.id.toString();
            console.log(formData.save);
        })

    }

    
    return (
        <body>
            <form className="create-profile__form">
            <label id="create-profile__label"> First Name</label> <input className="create-profile__input"
                type="text"
                id="message"
                onChange={handleChange}
                placeholder="Leave blank to keep the same"
                name="firstName"
                value={formData.firstName}
            />
            <label> Last Name</label> <input className="create-profile__input"
                type="text"
                id="message"
                onChange={handleChange}
                placeholder="Leave blank to keep the same"
                name="lastName"
                value={formData.lastName}
            />
            <br />

            <label> Username </label><input className="create-profile__input"
                type="text"
                id="message"
                onChange={handleChange}
                placeholder="Username"
                name="username"
                value={formData.username}
            />
            <br />
            <label> Email</label><input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <label> Password</label><input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />

            <br />
            
            <fieldset className = "create-profile__fieldset">
                <legend className = "create-profile__legend">Academic Year</legend>
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
            <label> Major</label><input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="major1"
                value={formData.major1}
            />
            <br />
            <input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Addition major (optional)"
                onChange={handleChange}
                name="major2"
                value={formData.major2}
            />
            <br />
           <input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Addition major (optional)"
                onChange={handleChange}
                name="major3"
                value={formData.major3}
            />
            <br />
            <label> Minor</label><input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Addition minor (optional)"
                onChange={handleChange}
                name="minor1"
                value={formData.minor1}
            />
                <input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Addition minor (optional)"
                onChange={handleChange}
                name="minor2"
                value={formData.minor2}
            />
                <input className="create-profile__input"
                type="text"
                id="message"
                placeholder="Addition minor (optional)"
                onChange={handleChange}
                name="minor3"
                value={formData.minor3}
            />
            <br />
            <br />
            <label> Bio</label>
            <br />
            <textarea 
            rows = "5"
            cols = "97"
                type="text"
                placeholder="Briefly describe any additional academic and/or extracurricular commitment you'd like to share."
               onChange={handleChange}
            />
             
<Link to="/profile">
<br />
                <button className="create-profile__button" onClick={handleSubmit}>
                    Save
                </button>
                </Link>

            </form>
            <br />
            </body>

    )
}
