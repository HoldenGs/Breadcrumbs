import React from 'react'
import { Select } from '@mantine/core';

export default function CourseCard({ courseName }) {
  return (
    <div className='course-card'>
      <div>{courseName}</div>
      <Select
        label="Your favorite framework/library"
        placeholder="Pick one"
        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' },
        ]}
      ></Select>
      <textarea rows='4' cols='36'></textarea>
    </div>
  )
}
