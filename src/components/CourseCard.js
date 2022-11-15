import React, { useState } from 'react';
import { Select, Rating } from '@mantine/core';

export default function CourseCard() {
  const [editable, setEditable] = useState(false)
  const [department, setDepartment] = useState("")
  const [course, setCourse] = useState("")
  const [professor, setProfessor] = useState("")
  const [rating, setRating] = useState(0)
  const [feelings, setFeelings] = useState("")

  return (
    <div className='course-card'>
      <button onClick={() => setEditable(!editable)}>{editable ? "Save" : "Edit"}</button>
      <div>New review</div>
      {editable ? (
        <>
          <Select
            placeholder='Department'
            searchable
            value={department}
            onChange={setDepartment}
            data={['COM SCI', 'MATH', 'PHYSICS', 'PSYCH']}
          ></Select>
          <Select
            placeholder='Course'
            searchable
            value={course}
            onChange={setCourse}
            data={[
              '31 - Introduction to Computer Science I',
              '32 - Introduction to Computer Science II',
              '33 - Introduction to Computer Organization',
              '35L - Software Construction'
            ]}
          ></Select>
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
          ></Select>
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
            onChange={(event) => setFeelings(event.target.value)}
          />
        </>
      ) : (
        <>
          <div><strong>{department + " " + course}</strong></div>
          <div>{professor}</div>
          <Rating count={10} value={rating} readOnly />
          <div>{feelings}</div>
        </>
      )}
    </div>
  );
}
