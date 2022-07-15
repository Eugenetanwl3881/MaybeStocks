import { useAuth } from "../hooks/useAuth";
import Button from "@mui/material/Button";
import SignIn from "../components/SignIn/SignIn";

function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <>
      <h2>Login</h2>
      <img src="../images/Maybe_Stocks_(3).png" />
      <SignIn />
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </>
  );
}

export default LoginPage;
