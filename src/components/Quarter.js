import React from 'react'
import CourseCard from "./CourseCard"

export default function Quarter({ quarterName }) {
  let coursesTaken = ['COM SCI 31', 'COM SCI 32', 'COM SCI 33', 'COM SCI 35L']
  return (
    <div className="quarter">
      <div>{quarterName}</div>
      {coursesTaken.length !== 0 ? (
        coursesTaken.map((object, idx) => (
          <CourseCard courseName={object}></CourseCard>
        )) 
      ) : (
        <div>No courses taken this quarter.</div>
      )}
    </div>
  )
}
