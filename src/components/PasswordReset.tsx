import { Link } from '@reach/router';
import {useState} from 'react'
import { auth } from '../firebase';

const PasswordReset = (props : any) => {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);

    const onChangeHandler = (event: any) => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
          setEmail(value);
        }
      };

    const sendResetEmail = (event: any) => {
        event.preventDefault();
        auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setEmailHasBeenSent(true);
          setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        })
        .catch(() => {
        //   setError("Error resetting password");
        console.log('Error resetting password')
        });
    };
    return (
        <div>
            <h1>Reset your Password</h1>
            <div className="">
                <form>
                    {emailHasBeenSent && (<div>An email has been sent to you!</div>)}
                    {error !== null && (<div>{error}</div>)}
                    <label htmlFor="userEmail">Email:</label>
                    <input 
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        placeholder="Enter your email address"
                        onChange={onChangeHandler}
                    />
                    <button onClick={sendResetEmail}>Send me a reset link</button>
                </form>
                <Link to ="/" className="my-2 text-blue-700 hover:text-blue-800 text-center block">
                    &larr; back to sign in page
                </Link>
            </div>
        </div>
    )
}

export default PasswordReset
