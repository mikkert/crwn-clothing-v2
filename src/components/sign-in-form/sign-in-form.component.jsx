import { useState } from 'react'
import FormInput from '../../components/form-input/form-input.component'
import {
   createUserDocumentFromAuth,
   signInWithGooglePopup,
   signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

const SignInForm = () => {
   const defaultFormFields = { email: '', password: '' }

   const [formFields, setFormFields] = useState(defaultFormFields)
   const { email, password } = formFields

   const signInWithGoogle = async () => {
      const { user } = await signInWithGooglePopup()
      await createUserDocumentFromAuth(user)
   }

   const onChangeHandler = (e) => {
      const { name, value } = e.target

      setFormFields({ ...formFields, [name]: value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const response = await signInAuthUserWithEmailAndPassword(
            email,
            password,
         )
         console.log(response)
      } catch (err) {
         switch (err.code) {
            case 'auth/invalid-email':
               alert('Please enter a valid email address')
               break
            case 'auth/wrong-password':
               alert('Wrong credentials')
               break
            case 'auth/user-not-found':
               alert('No user with this email')
               break
            default:
               console.log(err)
         }
      }
   }

   return (
      <div className='sign-in-container'>
         <h2>I already have an account</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               label='Email'
               type='email'
               name='email'
               value={email}
               onChange={onChangeHandler}
               required
            />
            <FormInput
               label='Password'
               type='password'
               name='password'
               value={password}
               onChange={onChangeHandler}
               required
            />
            <div className='buttons-container'>
               <Button type='submit' children='SIGN IN' />
               <Button
                  type='button'
                  children='SIGN IN WITH GOOGLE'
                  buttonType='google'
                  onClick={signInWithGoogle}
               />
            </div>
         </form>
      </div>
   )
}
export default SignInForm
