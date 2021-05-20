import React, {useState} from 'react'
import {Link} from '@reach/router';
import {auth, signInWithGoogle} from "../firebase";
import ProfilePage from './ProfilePage';
const SignIn = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onChangeHandler = (event: any) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail')
            setEmail(value);
        else if(name === 'userPassword')
            setPassword(value);
    }

    const signInWithEmailAndPasswordHandler = (event :any, email: any, password: any) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(res =>{
            alert('Success')
        })
        .catch(error => {
            // setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
            console.log(email,password)
            alert('Failure')
          });
    }

    return (
        <>
            <div className="">
                <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
                {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                <form>
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
                        id="userPassword"
                        placeholder="Enter your password"
                        onChange={(event) => onChangeHandler(event)}
                    />
                    <button onClick = {(event) => signInWithEmailAndPasswordHandler(event, email, password)}>
            Sign in
          </button>
                </form>
                <p className="text-center my-3">or</p>
                <button className="bg-red-500 hover:bg-red-600 w-full py-2 text-white" onClick={()=> signInWithGoogle()}>
                    Sign in with Google
                </button>
                <p className="">
                    Don't have an account?{" "}
                    <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                        Sign up here
                    </Link>{" "}
                    <br />{" "}
                    <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </>
    )
}

export default SignIn
