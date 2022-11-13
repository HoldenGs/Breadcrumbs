import { default as useAuth } from "./authContext"
import { Link } from "react-router-dom"
import {useEffect, useInsertionEffect, useState} from "react"
import {db} from "../firebase"
import "../scss/components/_login.scss"
import {serverTimestamp} from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";
import Profile from "./Profile"

export let userName = [];
export let actualname;
export let rows = [];

export default function Login() {
  const { login } = useAuth()
  const { currentUser, updatePassword, updateEmail } = useAuth()

  const [formData, setFormData] = useState(
    {
        email: "", 
        password: "",
    }
)

const [username, setUsername] = useState([])

useEffect(() => {
    if(currentUser!=null) {
    setUsername("")
    db
      .collection("user")
      .where("userID", "==", currentUser.uid.toString())
      .get()
      .then((results) => {
        results.forEach((doc) => {
          setUsername(doc.data().username)
          })
        });  
    }
  }, [])

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
        setUsername(doc.data().username)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

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

function handleChangePassword(event) {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
    try {
        login(formData.email, event.target.value)
        db.collection("user").where("userID", "==", currentUser.uid.toString())
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                setUsername(doc.data().username)
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      } catch {
      } 

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
                onChange={handleChangePassword}
                name="password"
                value={formData.password}
            />
            <br />
             
                <Link to={`/profile/${username}`} state={{from: {username}}} >
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
