import React from 'react';
import { Select } from '@mantine/core';

export default function CourseCard({ courseName }) {
  return (
    <div className='course-card'>
      <div>{courseName}</div>
      <Select
        placeholder='Department'
        searchable
        data={['COM SCI', 'MATH', 'PHYSICS', 'PSYCH']}
      ></Select>
      <Select
        placeholder='Course'
        searchable
        data={['31 - Introduction to Computer Science I',
        '32 - Introduction to Computer Science II',
        '33 - Introduction to Computer Organization',
        '35L - Software Construction']}
      ></Select>
      <textarea
        placeholder = 'Express your feelings for the course here...'
        rows='4'
        cols='36'
      ></textarea>
    </div>
  );
}
