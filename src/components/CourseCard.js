import React from 'react';
import { Select, Rating } from '@mantine/core';

export default function CourseCard() {
  return (
    <div className='course-card'>
      <div>New review</div>
      <Select
        placeholder='Department'
        searchable
        data={['COM SCI', 'MATH', 'PHYSICS', 'PSYCH']}
      ></Select>
      <Select
        placeholder='Course'
        searchable
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
        data={[
          'Smallberg, D.A.',
          'Nachenberg, C.S.',
          'Nowatzki, A.J.',
          'Eggert, P.R.'
        ]}
      ></Select>
      <Rating count={10} />
      <textarea
        placeholder = 'Express your feelings for the course here...'
        rows='4'
        cols='36'
      ></textarea>
    </div>
  );
}
