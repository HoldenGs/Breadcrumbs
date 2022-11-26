import {useState} from 'react'

import {Select, MultiSelect} from '@mantine/core'

import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import useAuth from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import {db} from "../firebase"
import {
	collection,
	addDoc,
    serverTimestamp,
    arrayUnion
} from 'firebase/firestore'

// Need to add dialog box or input error states
export default function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gradYear: '',
    major: '',
    minor: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  // Will not be state
  const gradYears = ['2023', '2024', '2025', '2026']
  const majors = [
    'Sociology',
    'Computer Science and Engineering',
    'Microbiology, Immunology, and Molecular Genetics',
    'Independent Studies'
  ]
  const minors = [
    'Sociology',
    'Computer Science and Engineering',
    'Microbiology, Immunology, and Molecular Genetics',
    'Independent Studies'
  ]

  // For TextInput components
  function handleFormChange(e) {
    const {name, value} = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  // For Mantine Select components
  function handleSelectChange(name, value) {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  // Remember to:
  // 	* Check password === passwordConfirmation
  // 	* Convert formData to correct data type
  // 	* setLoading(false) after successfully creating account
  function handleCreateAccount(e) {
    e.preventDefault()
    setLoading(true)
    if (formData.password != formData.passwordConfirmation) {
        // check if want to send an alert() message 
        alert("Passwords do not match")
        return
    }
    signup(formData.email, formData.password)
    .then(data => {  
        const addDocument = async() => {
        const docRef = await addDoc(collection(db, 'user'), {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            gradYear: formData.gradYear,
            majors: formData.major,
            minors: formData.minor,
            createdAt: serverTimestamp(),
            loggedIn: serverTimestamp(),
            followers: arrayUnion(),
            userID: data.user.uid,
            })
        }
        addDocument()
    }) 
    setLoading(false)

    }   

  // Placeholder function
  function handleCancel() {
      navigate('/')
  }

  return (
    <FullScreenContainer className='create-account'>
      <img
        className='login__logo'
        src='/logo-jet.svg'
        alt='Breadcrumbs Logo - Color'
      />
      <form className='create-account__form' onSubmit={handleCreateAccount}>
        <TextInput
          name='firstName'
          placeholder='First Name'
          value={formData.firstName}
          handleChange={handleFormChange}
          required={true}
        />
        <TextInput
          name='lastName'
          placeholder='Last Name'
          value={formData.lastName}
          handleChange={handleFormChange}
          required={true}
        />
        <Select
          placeholder='Graduation Year'
          searchable
          nothingFound='Invalid Graduation Year'
          data={gradYears}
          value={formData.gradYear}
          onChange={value => handleSelectChange('gradYear', value)}
          required
        />
        <MultiSelect
          placeholder='Major'
          searchable
          nothingFound='Invalid Major'
          data={majors}
          value={formData.major}
          onChange={value => handleSelectChange('major', value)}
          required
          maxSelectedValues={3}
        />
        <MultiSelect
          placeholder='Minor'
          searchable
          nothingFound='Invalid Minor'
          data={minors}
          value={formData.minor}
          onChange={value => handleSelectChange('minor', value)}
          required
          maxSelectedValues={3}
        />
        <TextInput
          name='username'
          placeholder='Username'
          value={formData.username}
          handleChange={handleFormChange}
          required={true}
        />
        <TextInput
          type='email'
          name='email'
          placeholder='Email Address'
          value={formData.email}
          handleChange={handleFormChange}
          required={true}
        />
        <TextInput
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          handleChange={handleFormChange}
          required={true}
        />
        <TextInput
          type='password'
          name='passwordConfirmation'
          placeholder='Confirm Password'
          value={formData.passwordConfirmation}
          handleChange={handleFormChange}
          required={true}
        />
        <Button text='Create Account' disabled={loading} handleClick={handleCreateAccount}/>
      </form>
      <Button text='Cancel' handleClick={handleCancel} disabled={loading} />
    </FullScreenContainer>
  )
}