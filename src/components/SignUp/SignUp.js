import React, { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const nameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      const user = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      updateProfile(user, { displayName: nameRef.current.value });
    } catch (error) {
      const errorMessage = error.toString();
      if (
        errorMessage === "FirebaseError: Firebase: Error (auth/invalid-email)."
      ) {
        setError("Invalid email!");
      } else if (
        errorMessage ===
        "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Password should be at least 6 characters.");
      } else if (
        errorMessage ===
        "FirebaseError: Firebase: Error (auth/email-already-in-use)."
      ) {
        setError("Email already in use!");
      } else {
        setError("Account cannot be created!");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <h1>Sign Up</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
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
            Username:
            <TextField
              id="outlined-username-input"
              label="Usename"
              type="username"
              inputRef={nameRef}
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
          <br />
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            Password Confirmation:
            <TextField
              id="outlined-password-confirmation-input"
              label="Password Confrimation"
              type="password"
              inputRef={confirmRef}
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleSubmit}>
              Sign Up
            </Button>
            <div
              style={{
                color: "red",
              }}
            >
              {error}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default SignUp;
