import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { HeaderContainer } from '../containers'
import { Form } from '../components'
import * as ROUTES from '../constants/routes'
import { FirebaseContext } from '../context/firebase'

export default function Signup() {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)
    const [firstName, setFirstName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isValid = firstName === '' || emailAddress === '' || password === ''

    const handleSignup = (event) => {
        event.preventDefault()

        firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password)
            .then((result) =>
                result.user
                .updateProfile({
                    displayName: firstName,
                    photoURL: Math.floor(Math.random() * 5) + 1
                })
            .then(() => {
                history.push(ROUTES.BROWSE)
            })
        ).catch((error) => {
            setEmailAddress('')
            setPassword('')
            setError(error.message)
        })
    }

    return (
        <HeaderContainer>
            <Form>
                <Form.Title>Sign Up</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                
                <Form.Base onSubmit={handleSignup} method="POST">
                    <Form.Input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                    <Form.Input
                        type="email"
                        placeholder="Email address"
                        value={emailAddress}
                        onChange={({ target }) => setEmailAddress(target.value)}
                    />
                    <Form.Input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="off"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Form.Submit disabled={isValid} type="Submit">
                        Sign Up
                    </Form.Submit>

                    <Form.Text>
                        Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA.
                    </Form.TextSmall>
                </Form.Base>
            </Form>
        </HeaderContainer>
    )
}