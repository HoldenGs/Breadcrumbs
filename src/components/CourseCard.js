import React, { useState, useEffect } from 'react';
import { Select, Rating } from '@mantine/core';

export default function CourseCard({ idx, editable, coursesTaken, setCoursesTaken, reviewInfo, handleReviewChange }) {
  const [department, setDepartment] = useState(reviewInfo.department)
  const [courseCode, setCourseCode] = useState(reviewInfo.courseCode)
  const [courseTitle, setCourseTitle] = useState(reviewInfo.courseTitle)
  const [professor, setProfessor] = useState(reviewInfo.professor)
  const [rating, setRating] = useState(reviewInfo.rating)
  const [feelings, setFeelings] = useState(reviewInfo.feelings)

  useEffect(() => {
    !editable && handleReviewChange({
        ...reviewInfo,
        department: department,
        courseCode: courseCode,
        courseTitle: courseTitle,
        professor: professor,
        rating: rating,
        feelings: feelings
    })
  }, [editable])

  function removeCourse() {
    setCoursesTaken(coursesTaken.filter((targetCourse) => targetCourse.id !== coursesTaken[idx].id))
  }

  return (
    <div className='course-card'>
      {editable ? (
        <>
          <button onClick={removeCourse}>X</button>
          <Select
            placeholder='Department'
            searchable
            value={department}
            onChange={setDepartment}
            data={['COM SCI', 'MATH', 'PHYSICS', 'PSYCH']}
          />
          <Select
            placeholder='Course Code'
            searchable
            value={courseCode}
            onChange={setCourseCode}
            data={[
              '35L',
              '200',
              '300'
            ]}
          />
          <Select
            placeholder='Professor'
            searchable
            value={professor}
            onChange={setProfessor}
            data={[
              'Smallberg, D.A.',
              'Nachenberg, C.S.',
              'Nowatzki, A.J.',
              'Eggert, P.R.'
            ]}
          />
          <Rating
            count={10}
            value={rating}
            onChange={setRating}
          />
          <textarea
            placeholder = 'Express your feelings for the course here...'
            rows='4'
            cols='36'
            value={feelings}
            onChange={e => setFeelings(e.target.value)}
          />
        </>
      ) : (
        <>
          <div><strong>{reviewInfo.department + ' ' + reviewInfo.courseCode}</strong>{' ' + reviewInfo.courseTitle}</div>
          <div>{reviewInfo.professor}</div>
          <Rating count={10} value={reviewInfo.rating} readOnly />
          <div>{reviewInfo.feelings}</div>
        </>
      )}
    </div>
  );
}
