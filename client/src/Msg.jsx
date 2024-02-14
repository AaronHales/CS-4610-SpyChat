import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

export const Msg = ({msg}) => {
  const [message, setMessage] = useState({});
  const [password, setPassword] = useState("");
  // const encrypted = encryptMessage(msg.message, msg.password);
  const [isEncrypted, setIsEncrypted] = useState(false);

  useEffect(() => {
    if(!isEncrypted) {
      setMessage(encryptMessage(msg.message, msg.password));
      setPassword(msg.password);
      setIsEncrypted(true);
    }
  }, [isEncrypted]);


  function msgClicked() {
    const dialog = document.getElementById("dialogBox");
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.disabled = true;
    dialog.showModal();
  }
  
  function passwordSubmit() {
    const dialogPassInput = document.getElementById("dialog_password");
    const dialog = document.getElementById("dialogBox");
    if (dialogPassInput.value == password) {
      // alert("Entered password is correct!");
      dialog.close();
      console.log("Encrypted message: " + message);
      setMessage(decryptMessage(message, password));
    }
    else {
      alert("Entered password is incorrect!");
      dialogPassInput.value = "";
    }
    dialogPassInput.value = "";
  }

  function encryptMessage(givenMessage, givenPassword) {
    console.log("encrypt called");
    console.log("message: " + givenMessage + ", password: " + givenPassword)
    var encrypted = CryptoJS.DES.encrypt(givenMessage, givenPassword);
    console.log("encrypted message: " + encrypted);
    console.log(encrypted);
    return encrypted;
  }

  function decryptMessage(givenMessage, givenPassword) {
      console.log("word: " + givenMessage.toString() + ", pass: " + givenPassword);
      var messageDecrypt = CryptoJS.DES.decrypt(givenMessage, givenPassword);
      console.log(messageDecrypt);
      console.log(messageDecrypt);
      return messageDecrypt.toString();
  }

    return (
    <>
      <dialog id='dialogBox'>
        <form>
          <input id='dialog_password' type='text' placeholder='password' />
          <button id='dialog_bttn' type='button' onClick={passwordSubmit}>Decrypt</button>
        </form>
      </dialog>
      <div id="messageDiv">
        <p id="message" onClick={msgClicked}>{message.toString()}</p>
      </div>
    </>
    );
}
