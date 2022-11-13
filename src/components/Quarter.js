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

  const [coursesTaken, setCoursesTaken] = useState([])

  function addCourseCard() {
    let newCoursesTaken=coursesTaken.slice()
    newCoursesTaken.push(dummy)
    setCoursesTaken(newCoursesTaken)
  }
  
  return (
    <div className="quarter">
      <div>{quarterName}</div>
      {coursesTaken.length !== 0 ? (
        coursesTaken.map((course, idx) => (
          <CourseCard key={idx} courseName={course.courseCode + " - " + course.courseTitle}></CourseCard>
        )) 
      ) : (
        <div>No courses taken this quarter.</div>
      )}
      <button onClick={addCourseCard}>Add course</button>
    </div>
  )
}
