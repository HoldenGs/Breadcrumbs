import {useState} from "react"
import "../scss/components/_update-profile.scss"
import { Link } from "react-router-dom"
import {default as useAuth} from "./authContext.js"
import { db} from "../firebase"
import { getAuth } from "firebase/auth";

export let nameFirst = ""
export let nameLast = ""
export let email = ""
export let major = ""
export let username = ""
export let minor = ""
export let bio = ""

export default function UpdateProfile() {

    const { currentUser, updatePassword, updateEmail } = useAuth()

    const [formData, setFormData] = useState(
        {
            firstName: "", 
            lastName: "", 
            email: "", 
            year: "",
            username: "",
            password: "",
            password2: "",
            major1: "",
            major2: "",
            major3: "",
            minor1: "",
            minor2: "",
            minor3: "",
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

        if(formData.password!=formData.password2) {
            return "Passwords do not match"
        }

        //todo: check the email isn't taken
        console.log(formData.email)
        // console.log(currentUser.email)

        const auth = getAuth();


        db.collection("user").where("userID", "==", currentUser.uid.toString())
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // console.log(doc.id, " => ", doc.data().lastName);

                            //todo: make the option for if user wants to delete a major/minor/bio
                            if(formData.firstName!=doc.data().firstName && formData.firstName.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    firstName: formData.firstName
                                });
                            }
                            if(formData.lastName!=doc.data().lastName && formData.lastName.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    lastName: formData.lastName
                                });
                            }
                            if(formData.major1!=doc.data().major1 && formData.major1.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    major1: formData.major1
                                });
                            }
                            if(formData.minor1!=doc.data().minor1 && formData.minor1.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    minor1: formData.minor1
                                });
                            }
                            //todo: make sure none of those usernames are taken
                            if(formData.username!=doc.data().username && formData.username.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    username: formData.username
                                });
                            }
                            if(document.querySelector('input[name="year"]:checked')!=null && formData.year!=doc.data().year && formData.year.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    year: document.querySelector('input[name="year"]:checked').value
                                });
                            }
                            if(formData.major2!=doc.data().major2 && formData.major2.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    major2: formData.major2
                                });
                            }
                            if(formData.major3!=doc.data().major3 && formData.major3.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    major3: formData.major3
                                });
                            }
                            if(formData.minor2!=doc.data().minor2 && formData.minor2.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    major2: formData.major2
                                });
                            }
                            if(formData.minor3!=doc.data().minor3 && formData.minor3.length>0) {
                                db.collection("user").doc(doc.id.toString()).update({
                                    minor3: formData.minor3
                                });
                            }

                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
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

            <input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Confirm password"
                onChange={handleChange}
                name="password2"
                value={formData.password2}
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
            <label> Major</label><input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="major1"
                value={formData.major1}
            />
            <br />
            <input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Addition major (optional)"
                onChange={handleChange}
                name="major2"
                value={formData.major2}
            />
            <br />
           <input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Addition major (optional)"
                onChange={handleChange}
                name="major3"
                value={formData.major3}
            />
            <br />
            <label> Minor</label><input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Addition minor (optional)"
                onChange={handleChange}
                name="minor1"
                value={formData.minor1}
            />
                <input className="update-profile__input"
                type="text"
                id="message"
                placeholder="Addition minor (optional)"
                onChange={handleChange}
                name="minor2"
                value={formData.minor2}
            />
                <input className="update-profile__input"
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
                <button className="update-profile__button" onClick={handleSubmit}>
                    Save
                </button>
                </Link>

            </form>
            <br />
            </body>

    )
}




