import { useAuth } from "../hooks/useAuth";
import Button from '@mui/material/Button';
import SignIn from "../components/SignIn/SignIn";

function LoginPage() {
    const { signInWithGoogle } = useAuth();

    return(
    <>
        <h2>Login</h2>
        <SignIn />
        <Button variant="contained" color="primary" onClick={signInWithGoogle}>
            Sign in with Google
        </Button>
    </>
    )
}

export default LoginPage;