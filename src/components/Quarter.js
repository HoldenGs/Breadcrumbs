import React, { useState } from 'react'
import CourseCard from './CourseCard'

export default function Quarter({ quarterName }) {
  const [editable, setEditable] = useState(false)
  const [coursesTaken, setCoursesTaken] = useState([])
  const [dumbID, setDumbID] = useState(0)

  function addCourseCard() {
    let newCoursesTaken = coursesTaken.slice()
    newCoursesTaken.push({
      id: dumbID,
      department: '',
      course: '',
      professor: '',
      quarter: quarterName,
      rating: 0,
      feelings: '', 
    })
    setCoursesTaken(newCoursesTaken)
    setDumbID(dumbID+1)
  }
  
  return (
    <div className="quarter">
      <div>{quarterName}</div>
      <button onClick={() => setEditable(!editable)}>{editable ? "Save" : "Edit"}</button>
      {coursesTaken.length !== 0 ? (
        coursesTaken.map((course) => (
          <CourseCard
            key={course.id}
            idx={coursesTaken.findIndex(targetCourse => targetCourse.id === course.id)}
            editable={editable} coursesTaken={coursesTaken}
            setCoursesTaken={setCoursesTaken}
          />
        )) 
      ) : (
        <div>No courses taken this quarter.</div>
      )}
      {editable && <button onClick={addCourseCard}>Add course</button>}
    </div>
  )
}
