import { useEffect, useState } from 'react';
import './App.css';
import {io} from "socket.io-client";
import {Msg} from './Msg';

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const callback = (newCount) => {
      setCount(newCount);
      if (loading) {
        setLoading(false);
      }
    }
    socket.on("new state", callback);
    return () => {
      socket.off("new state", callback);
    }
  }, [socket, loading]);

  function sendMessage() {
    console.log("send message");
    setMsgs([...msgs, {message, password}]);
    setMessage("");
    setPassword("");
  }

  function increment() {
    socket.emit("increment");
  }

  function decrement() {
    socket.emit("decrement");
  }

  return (
    <>
      <dialog id='dialog'>
        <form>
          <input id='dialog_password' type='text' placeholder='password'></input>
          <button id='dialog_bttn' type='button'>Decrypt</button>
        </form>
      </dialog>
      <div>
        {
          msgs.map((msg) => (
            <Msg key={msgs.indexOf(msg)} msg={msg}/>
          ))
        }
      </div>
      <form className='message-form'>
        <input type='text' onChange={e => setMessage(e.target.value)} placeholder='enter message'></input>
        <input type='text' onChange={e => setPassword(e.target.value)} placeholder='enter password'></input>
        <button type='button' onClick={sendMessage}>Send Message</button>
      </form>
    </>
  )
}

export default App