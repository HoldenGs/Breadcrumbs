import {useState} from 'react'

import {Select} from '@mantine/core'

import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

// Need to add dialog box or input error states
export default function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gradYear: '',
    major: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [loading, setLoading] = useState(false)

  // Will not be state
  const gradYears = ['2023', '2024', '2025', '2026']
  const majors = [
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
  }

  // Placeholder function
  function handleCancel() {
    console.log('Cancel')
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
        <Select
          placeholder='Major'
          searchable
          nothingFound='Invalid Major'
          data={majors}
          value={formData.major}
          onChange={value => handleSelectChange('major', value)}
          required
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
        <Button text='Create Account' disabled={loading} />
      </form>
      <Button text='Cancel' handleClick={handleCancel} disabled={loading} />
    </FullScreenContainer>
  )
}
