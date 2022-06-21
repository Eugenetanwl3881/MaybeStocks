import { useState } from "react";
import Button from '@mui/material/Button';
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";

function LoginOrSignUpPage() {

    const [showSignUp, setShowSignUp] = useState(false);
     
    const onClick = () => setShowSignUp(true);

    return(
    <>
        <div>{showSignUp ? <SignUpPage /> : <LoginPage />}</div>
        <div>Don't have an account? 
            <Button size="small" onClick={onClick}>Sign Up</Button>
            here!
        </div>
    </>
    )
}

export default LoginOrSignUpPage;