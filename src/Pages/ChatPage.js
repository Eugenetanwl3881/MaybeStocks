import { useRef, useState } from "react";
import { useAuth, db } from "../hooks/useAuth";
import { collection, query, orderBy, limit, serverTimestamp, setDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function ChatPage() {
  const { auth, user } = useAuth();

  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth?.uid ? "sent" : "received";

    return (
      <>
        <div className={`message ${messageClass}`}>
          <img
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
          <p>{text}</p>
        </div>
      </>
    );
  }

  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = user;
    await setDoc(messagesRef, 
        {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
        });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

export default ChatPage;
