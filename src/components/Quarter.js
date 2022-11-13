import React, { useState } from 'react'
import CourseCard from "./CourseCard"

export default function Quarter({ quarterName }) {
  const [coursesTaken, setCoursesTaken] = useState(['COM SCI 31', 'COM SCI 32', 'COM SCI 33', 'COM SCI 35L'])

  function addCourseCard() {
    let newCoursesTaken=coursesTaken.slice()
    newCoursesTaken.push('New course')
    setCoursesTaken(newCoursesTaken)
  }
  
  return (
    <div className="quarter">
      <div>{quarterName}</div>
      {coursesTaken.length !== 0 ? (
        coursesTaken.map((object, idx) => (
          <CourseCard key={idx} courseName={object}></CourseCard>
        )) 
      ) : (
        <div>No courses taken this quarter.</div>
      )}
      <button onClick={addCourseCard}>Add course</button>
    </div>
  )
}
