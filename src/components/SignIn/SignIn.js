import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [errorBool, setErrorBool] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const user = await signin(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      setErrorBool(true);
      setError("Wrong email/password!");
    }
    setLoading(false);
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        justifyContent="center"
      >
        <div>
          <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          >
            Email:
            <TextField
              required
              id="outlined-required"
              label="Required"
              inputRef={emailRef}
            />
          </div>
          <br />
          <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          >
            Password:
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
          </div>
          <div>
            <Button 
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            {
              errorBool ?
                <div
                  style={{
                    color: "red"
                  }}
                >
                  {error}
                </div>
                : <div></div>
            }
            
          </div>
        </div>
      </Box>
    </>
  );
}

export default SignIn;
