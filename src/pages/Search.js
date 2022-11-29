import {useState, useEffect} from 'react'

import {Loader} from '@mantine/core'

import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import Button from '../components/Button'

// Search query will be read from the URL
// Firestore query will be called from this component
// This version assumes all search results will be returned at once (no pagination)

// FRONTEND TODO:
// 	* Make the results "clickable"
// 	* Empty results message
export default function Search() {
  const [profiles, setProfiles] = useState([])
  const [courses, setCourses] = useState([])
  const [numProfiles, setNumProfiles] = useState(5)
  const [numCourses, setNumCourses] = useState(5)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Query from Firestore and store result into state
    setLoading(false)
  }, [])

  const profileCards = profiles
    .slice(0, numProfiles)
    .map(({name, gradYear, major, highlightedReview}) => (
      <ProfileCard
        name={name}
        gradYear={gradYear}
        major={major}
        reviewLabel='Latest Review'
        review={highlightedReview}
      />
    ))

  const courseCards = courses
    .slice(0, numCourses)
    .map(({name, gradYear, major, latestReview}) => (
      <ProfileCard
        name={name}
        gradYear={gradYear}
        major={major}
        reviewLabel='Course Review'
        review={latestReview}
      />
    ))

  return (
    <div className='search'>
      <Header />
      {loading ? (
        <Loader size='lg' />
      ) : (
        <>
          <div className='search__profiles'>
            <h2 className='search__heading'>Profile Results</h2>
            {profileCards}
            {numProfiles < profiles.length && (
              <Button
                text='Show More'
                handleClick={() =>
                  setNumProfiles(prevNumProfiles => prevNumProfiles + 5)
                }
              />
            )}
          </div>
          <div className='search__courses'>
            <h2 className='search__heading'>Course Results</h2>
            {courseCards}
            {numCourses < courses.length && (
              <Button
                text='Show More'
                handleClick={() =>
                  setNumCourses(prevNumCourses => prevNumCourses + 5)
                }
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
