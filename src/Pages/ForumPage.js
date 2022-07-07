import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { useAuth, db } from "../hooks/useAuth";
import {
  query,
  onSnapshot,
  orderBy,
  collection,
  doc,
  getDoc,
  addDoc,
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
    async function fetchData() {
      const docRef = doc(db, "Messages", "general");
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        let sortedByTime = [];
        for (const key in docSnapshot.data()) {
          sortedByTime.push(docSnapshot.data()[key]);
        }
        sortedByTime.sort(function (a, b) {
          return a.time - b.time;
        });
        setMessagesState(sortedByTime);
      } else {
        setMessagesState([]);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {messages.map((obj) => (
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {obj.username + ": " + obj.message}
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
            />
            <IconButton color="primary" aria-label="submit">
              <SendIcon fontSize="large" />
            </IconButton>
          </div>
        </Box>
      </form>
    </>
  );
}

export default ForumPage;
