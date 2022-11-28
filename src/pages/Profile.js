import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'

export default function Profile() {
  const [editable, setEditable] = useState(false)
  const quarters = ['Fall 2022', 'Spring 2022', 'Winter 2022', 'Fall 2021']
  
  const exampleReviews = [
    {
      reviewID: '1',
      userID: '1234567890',
      creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
      department: 'COM SCI',
      courseCode: '35L',
      courseTitle: 'Software Construction',
      professor: 'Eggert, P.R.',
      quarter: 'Fall 2022',
      startDate: '2022-9-19',
      rating: 8,
      feelings:
        'This was an interesting class... An interesting class indeed. What an interesting class. There are some interesting observations about this class. Interesting...'
    },
    {
      reviewID: '2',
      userID: '1234567890',
      creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
      department: 'COM SCI',
      courseCode: '200',
      courseTitle: 'Another Class',
      professor: 'Eggert, P.R.',
      quarter: 'Spring 2022',
      startDate: '2022-9-19',
      rating: 9,
      feelings:
        'This was an interesting class... An interesting class indeed. What an interesting class. There are some interesting observations about this class. Interesting...'
    },
    {
      reviewID: '3',
      userID: '1234567890',
      creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
      department: 'COM SCI',
      courseCode: '300',
      courseTitle: 'A Third Class',
      professor: 'Eggert, P.R.',
      quarter: 'Fall 2022',
      startDate: '2022-9-19',
      rating: 10,
      feelings:
        'This was an interesting class... An interesting class indeed. What an interesting class. There are some interesting observations about this class. Interesting...'
    }
  ]

  const [reviews, setReviews] = useState(exampleReviews)

  function handleReviewChange(changedReview, remove = false) {
    if (remove) {
      setReviews(reviews.filter(targetReview => targetReview.reviewID !== changedReview.reviewID))
      return
    }
    let idx = reviews.findIndex(review => review.reviewID === changedReview.reviewID)
    if (idx === -1) {
      setReviews(state => {
        let newState = state.slice()
        newState.push(changedReview)
        return newState 
      })
    } else {
      setReviews(state => ([
        ...state.slice(0, idx),
        changedReview,
        ...state.slice(idx+1)
      ]))
    }
  }

  return (
    <div className='profile'>
      <Header />
      <UserInfo name='Bobbie Smith' year={2} major='Computer Science and Engineering' editable={editable} />
      <Button text={editable ? 'Save' : 'Edit'} handleClick={() => setEditable(!editable)} />
      {quarters.map(quarter => (
        <Quarter
          key={quarter}
          name={quarter}
          editable={editable}
          reviews={reviews.filter(review => review.quarter === quarter)}
          handleReviewChange={handleReviewChange}
        />
      ))}
    </div>
  )
}
