import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

const Application = () => {
    
    let user = null;
    return (
        user ? 
        <ProfilePage path="profile"/>
        :
        <Router>
        <SignUp path="signUp"/>
        <SignIn path="/"/>
        <PasswordReset path="passwordReset"/>
    </Router>

    )
}

export default Application
