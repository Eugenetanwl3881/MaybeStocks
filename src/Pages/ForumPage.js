import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { useAuth, db } from "../hooks/useAuth";
import { Text } from "react";

import {
  query,
  onSnapshot,
  orderBy,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore";

function ForumPage() {
  // This is how we update firestore
  const [messages, setMessagesState] = useState([]);
  // This will store the current text in the input box
  const [newText, setNewTextState] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const colRef = collection(db, "Messages");
    const q = query(colRef, orderBy("time"));
    function fetchData() {
      onSnapshot(q, (querySnapshot) => {
        const allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        });
        setMessagesState(allMessages);
      });
    }
    fetchData();
  }, [db]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const colRef = collection(db, "Messages");
    await addDoc(colRef, {
      text: newText,
      time: serverTimestamp(),
      username: user?.displayName,
    });
    setNewTextState("");
  };

  return (
    <>
      {messages.map((obj) => (
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          sx={{
            border: 1,
            m: 2,
            p: 1,
            borderRadius: 2,
            width: 1 / 4,
            mx: "auto",
          }}
        >
          {obj.username + ": " + obj.text}
          <text>{obj.time.toDate().toString()}</text>
        </Grid>
      ))}
      <form>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              id="outlined-textarea"
              label="Enter your message here"
              multiline
              onChange={(event) => setNewTextState(event.target.value)}
            />
            <IconButton
              color="primary"
              aria-label="submit"
              onClick={sendMessage}
            >
              <SendIcon fontSize="large" />
            </IconButton>
          </div>
        </Box>
      </form>
    </>
  );
}

export default ForumPage;
