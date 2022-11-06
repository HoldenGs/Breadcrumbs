import { default as useAuth } from "./authContext"
import { Link } from "react-router-dom"
import {useState} from "react"
import {db} from "../firebase"
import "../scss/components/_login.scss"
import {serverTimestamp} from "firebase/firestore"

export default function Login() {
  const { login } = useAuth()
  const { currentUser, updatePassword, updateEmail } = useAuth()

  const [formData, setFormData] = useState(
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
        userID: 0,
        saveMe: "",
    }
)

  function handleSubmit() {

    try {
      login(formData.email, formData.password)
    } catch {
    }
    console.log(currentUser.uid.toString());
    db.collection("user").where("userID", "==", currentUser.uid.toString())
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            db.collection("user").doc(doc.id.toString()).update({
                    loggedIn: serverTimestamp(),
                });

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  function handleChange(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })

}

  return (
        <body>
            <form className="login__form">
            <label> Email</label><input className="login__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <label> Password</label><input className="login__input"
                type="text"
                id="message"
                placeholder="Leave blank to keep the same"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />
            <br />
             
                <Link to="/profile">
                <br />
                <button className="login__button" onClick={handleSubmit}>
                    Login
                </button>
                </Link>

                <center><h3>or</h3></center>
                <br />
                <Link to="/create-profile">
                <button className="login__button">
                Create Account
                </button>
                </Link>

            </form>
</body>
  )
}
