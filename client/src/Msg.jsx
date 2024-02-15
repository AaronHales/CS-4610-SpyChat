import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

export const Msg = ({msg}) => {
  const [messageMsg, setMessageMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  // const encrypted = encryptMessage(msg.message, msg.password);
  const [isEncrypted, setIsEncrypted] = useState(false);

  useEffect(() => {
    if(!isEncrypted) {
      setMessageMsg(encryptMessage(msg.message, msg.password));
      setPasswordMsg(msg.password);
      setIsEncrypted(true);
    }
  }, [isEncrypted]);




  function msgClicked() {
    console.log("msg.password: " + msg.password);
    console.log(passwordMsg);
    const dialog = document.getElementById("dialogBox");
    const messageDiv = document.getElementById("messageDiv");
    messageDiv.disabled = true;
    dialog.showModal();
  }
  
  const passwordSubmit = () => {
    console.log("msg.password: " + msg.password);
    console.log("passwordMsg: " + passwordMsg);
    const dialogPassInput = document.getElementById("dialog_password");
    const dialog = document.getElementById("dialogBox");
    if (dialogPassInput.value == msg.password) {
      // alert("Entered password is correct!");
      dialog.close();
      setMessageMsg(decryptMessage(messageMsg, msg.password).toString());
    }
    else {
      alert("Entered password is incorrect!");
      dialogPassInput.value = "";
    }
    dialogPassInput.value = "";
  }

  function encryptMessage(givenMessage, givenPassword) {
    var encrypted = CryptoJS.AES.encrypt(givenMessage, givenPassword);
    return encrypted.toString();
  }

  function decryptMessage(givenMessage, givenPassword) {
      var messageDecrypt = CryptoJS.AES.decrypt(givenMessage, givenPassword);
      return messageDecrypt.toString(CryptoJS.enc.Utf8);
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
        <p id="message" onClick={msgClicked}>{messageMsg}</p>
      </div>
    </>
    );
}
