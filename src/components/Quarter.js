import React, { useState } from 'react'
import CourseCard from './CourseCard'

export default function Quarter({ name, editable, reviews, handleReviewChange }) {
  const [coursesTaken, setCoursesTaken] = useState([])
  const [dumbID, setDumbID] = useState(0)

  function addCourseCard() {
    let newCoursesTaken = coursesTaken.slice()
    newCoursesTaken.push({
      id: dumbID,
      department: '',
      course: '',
      professor: '',
      quarter: name,
      rating: 0,
      feelings: '', 
    })
    setCoursesTaken(newCoursesTaken)
    setDumbID(dumbID+1)
  }
  
  return (
    <div className='quarter'>
      <div>{name}</div>
      {reviews.length !== 0 ? (
        reviews.map((review) => (
          <CourseCard
            key={review.reviewID}
            // idx={coursesTaken.findIndex(targetCourse => targetCourse.id === course.id)}
            editable={editable}
            coursesTaken={coursesTaken}
            setCoursesTaken={setCoursesTaken}
            reviewInfo={review}
            handleReviewChange={handleReviewChange}
          />
        )) 
      ) : (
        <div>No reviews for this quarter.</div>
      )}
      {editable && <button onClick={addCourseCard}>Add course</button>}
    </div>
  )
}
