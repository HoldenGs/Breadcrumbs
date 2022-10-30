import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from "./components/profile"
import UpdateProfile from "./components/updateProfile"
import { AuthProvider } from "./components/AuthContext"


function App() {
  return (
      <div className="w-100" style={{ maxWidth: "800px" }}>
      
        <Router>
          <AuthProvider>
            <Routes>
            <Route exact path="/" element={<Profile/>}  />
            <Route  path="/profile" element={<Profile/>} />
            <Route  path="/update-profile" element={<UpdateProfile/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
  )
}

export default App
