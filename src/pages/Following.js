import React from 'react'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'

export default function Following() {
  const usrs = [
    {
      name: 'Jason Tay',
      year: '3rd Year',
      major: 'Computer Science'
    },
    {
      name: 'Ollie Pai',
      year: '2nd Year',
      major: 'Computer Science'
    },
    {
      name: 'Sally Bo',
      year: '4th Year',
      major: 'Microbiology, Immunology, and Molecular Genetics'
    },
  ]
  return (
    <div className='following'>
      <Header />
      {usrs.map((usr) => (
        <ProfileCard
          name={usr.name}
          year={usr.year}
          major={usr.major}
        />
      ))}
      <ProfileCard />
    </div>
  )
}
