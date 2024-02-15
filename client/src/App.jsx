import { useEffect, useState } from 'react';
import './App.css';
import {io} from "socket.io-client";
import {Msg} from './Msg';

function App() {
  const message = document.getElementById("messageInput");
  const password = document.getElementById("passwordInput");
  const [msgs, setMsgs] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("new message", (msg) => {
      setMsgs([...msgs, msg]);
    });
  }, [socket, msgs]);

  function sendMessage() {
    console.log("send message");
    if (password == "" || message == "") {
      alert("please enter a message and password");
    }
    else {
      socket.emit("new message", {message: message.value, password: password.value});
    }
    message.value = "";
    password.value = "";
  }

  return (
    <>
      <h3>messages</h3>
      <div id="messages">
        {
          msgs.map((msg) => (
            <Msg key={Math.random(0, 1000000000)} msg={msg} onClick={e => console.log(e.target.value + " was clicked")}/>
          ))
        }
      </div>
      <div>
        <form>
          <input id="messageInput" type='text' placeholder='enter message' />
          <input id="passwordInput" type='text' placeholder='enter password' />
          <button type='button' onClick={sendMessage}>Send Message</button>
        </form>
      </div>
    </>
  )
}

export default App