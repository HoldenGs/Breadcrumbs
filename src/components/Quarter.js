import React, { useState } from 'react'
import CourseCard from "./CourseCard"

export default function Quarter({ quarterName }) {
  let dummy = {
    courseCode: "COM SCI 35L",
    courseTitle: "Software Construction",
    professor: "Eggert",
    qurater: "Fall 2022",
    rating: 5,
    feelings: "This class is hmmmmmm.",
  }

  const [editable, setEditable] = useState(false)
  const [coursesTaken, setCoursesTaken] = useState([])

  function addCourseCard() {
    let newCoursesTaken=coursesTaken.slice()
    newCoursesTaken.push(dummy)
    setCoursesTaken(newCoursesTaken)
  }
  
  return (
    <div className="quarter">
      <div>{quarterName}</div>
      <button onClick={() => setEditable(!editable)}>{editable ? "Save" : "Edit"}</button>
      {coursesTaken.length !== 0 ? (
        coursesTaken.map((course, idx) => (
          <CourseCard editable={editable} />
        )) 
      ) : (
        <div>No courses taken this quarter.</div>
      )}
      {editable && <button onClick={addCourseCard}>Add course</button>}
    </div>
  )
}
