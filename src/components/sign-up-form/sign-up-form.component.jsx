import { useState, useContext } from 'react'

import {
   createAuthUserWithEmailAndPassword,
   createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import { UserContext } from '../../contexts/user.context'

import './sign-up-form.styles.scss'

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: '',
}
const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const { displayName, email, password, confirmPassword } = formFields

   const { setCurrentUser } = useContext(UserContext)

   console.log('hit')

   const resetFormFields = () => setFormFields(defaultFormFields)

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!displayName || !email || !password || !confirmPassword) return
      if (password !== confirmPassword) return alert("Passwords don't match")
      try {
         const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password,
         )
         await createUserDocumentFromAuth(user, { displayName })

         setCurrentUser(user)

         resetFormFields()
      } catch (err) {
         if (err.code === 'auth/email-already-in-use')
            alert('Cannot create user, email already in use')
         else console.error('User creation encountered an error', err)
      }
   }
   const handleChange = (e) => {
      const { name, value } = e.target
      setFormFields({ ...formFields, [name]: value })
   }
   return (
      <div className='sign-up-container'>
         <h2>Don't have an account?</h2>
         <span>Sign up with your email and password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               key='1'
               label='Display Name'
               id='display-name'
               name='displayName'
               type='text'
               required
               onChange={handleChange}
               value={displayName}
            />
            <FormInput
               key='2'
               label='Email'
               id='email'
               name='email'
               type='email'
               required
               onChange={handleChange}
               value={email}
            />
            <FormInput
               key='3'
               label='Password'
               id='password'
               name='password'
               type='password'
               required
               onChange={handleChange}
               value={password}
            />
            <FormInput
               key='4'
               label='Confirm Password'
               id='password-confirm'
               name='confirmPassword'
               type='password'
               required
               onChange={handleChange}
               value={confirmPassword}
            />
            <Button type='submit' children='Sign Up' />
         </form>
      </div>
   )
}

export default SignUpForm
