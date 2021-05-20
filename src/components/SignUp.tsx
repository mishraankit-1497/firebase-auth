import React, {useState} from 'react'
import {Link} from '@reach/router';
import { signInWithGoogle } from '../firebase';
import {auth, generateUserDocument} from '../firebase';
const SignUp = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);


    const createUserWithEmailAndPasswordHandler =async (event: any, email: any, password: any) =>{
        event.preventDefault();
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});
            alert('Registration successfull')
          }
          catch(error){
            // setError('Error Signing up with email and password');
          }
        setEmail('');
        setPassword('');
        setDisplayName('');
    }

    const onChangeHandler = (event: any) => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
          setEmail(value);
        } else if (name === "userPassword") {
          setPassword(value);
        } else if (name === "displayName") {
          setDisplayName(value);
        }
      };

    return (
        <>
            <div className="">
                <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
                {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                <form>
                    <label htmlFor="displayName">Display Name:</label>
                    <input 
                        type="text"
                        name="displayName"
                        id="displayName"
                        placeholder="Enter your name"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="userEmail">Email:</label>
                    <input 
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        placeholder="Enter your email address"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <label htmlFor="userPassword">Password:</label>
                    <input 
                        type="password"
                        name="userPassword"
                        id="userEmail"
                        placeholder="Enter your password"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <button onClick = {(event) => createUserWithEmailAndPasswordHandler(event, email, password)}>
            Sign Up
          </button>
                </form>
                <p className="text-center my-3">or</p>
                    <button onClick={() => signInWithGoogle()}>
                    Sign In with Google
                    </button>
                    <p className="text-center my-3">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:text-blue-600">
                        Sign in here
                    </Link>
                </p>
            </div>
        </>
    )
}

export default SignUp
