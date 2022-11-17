import React, {useState} from 'react'

import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  function handleFormChange(e) {
    const {name, value} = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <FullScreenContainer className='login'>
      <img
        className='login__logo'
        src='/logo-jet.svg'
        alt='Breadcrumbs Logo - Color'
      />
      <p className='login__description'>
        A human-centered course recommendation platform.
      </p>
      <form className='login__form' onSubmit={handleLogin}>
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
        <Button text='Login' disabled={loading} />
      </form>
      <p className='login__or'>or</p>
      <Button text='Create Account' handleClick={() => ''} />
      <Button text='Forgot Password' handleClick={() => ''} />
    </FullScreenContainer>
  )
}
