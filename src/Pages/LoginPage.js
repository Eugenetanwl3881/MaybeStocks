import { useAuth } from "../hooks/useAuth";
import Button from '@mui/material/Button';

function LoginPage() {
    const { signInWithGoogle } = useAuth();

    return(
    <>
        <h1>Login</h1>
        <Button variant="contained" 
                color="primary"
                onClick={signInWithGoogle}>
                    Sign in with Google
                </Button>
    </>
    )
}

export default LoginPage;