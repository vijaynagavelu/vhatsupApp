import './App.css';
import { ChatProvider } from './ChatContext';
import ChatsSection from './components/ChatsSection';
import MessageSection from './components/MessageSection';
import { useState, useEffect } from "react";
import { auth } from './firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Input from './components/Input';


function App() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [disableError, setDisableError] = useState("");
  const [user, setUser] = useState();



  useEffect(() => {
    replaceText()
    const subscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return subscriber;
  },)

  const login = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  }

  const logout = async () => {
    await signOut(auth);
    document.location.reload();
    window.location.reload();
  }

  function replaceText() {
    var a = errorMessage;
    setDisableError("")
    setEmailError("");
    setPasswordError("");

    if (a.toLowerCase().includes("not-found") || a.includes("email")) {
      setEmailError("Email not found");
      console.log("gott")
    }
    if (a.toLowerCase().includes("password")) {
      setPasswordError("Password incorrect");
      console.log("wrong passcode")
    }
    if (emailError && !loginPassword) {
      setPasswordError("Enter password ");
      console.log("wrong passcode")
    }
    if (a.toLowerCase().includes("disabled")) {
      setDisableError(errorMessage);
      console.log("down")
    }
  }

  if (!user) {

    return (

      <div className="loginPage">

        <h4 >Login to your account </h4>
        <p className="fontSize13px">In order to use the editing and rating capabilities of TMDB,
          as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account
          is free and simple.
        </p>

        <form onSubmit={login} >

          <div className="flexGrow">
            <div><Input placeHolder=" Email" label="Email" setItem={setLoginEmail} errorMessage={emailError} /> </div>
            <br />
            <div><Input placeHolder=" Password" type="password" label="Password" setItem={setLoginPassword} errorMessage={passwordError} /></div>
          </div>

          <div><input type="submit" className="loginButton" value="Login" /></div>
          <br />
          <div><input type="submit" value="LogOut" onClick={logout} /></div>

          <div className={disableError ? "errorMessage" : "transparentMessage"}> {`${disableError ? disableError : ""}`}</div>


          {user && <div>{user.uid}</div>}

        </form>


      </div>


    )
  }


  return (
    <div className="App">
      <ChatProvider>
        <div className='container'>

          <ChatsSection />

          <MessageSection />

        </div>
      </ChatProvider>
    </div >
  );
}
export default App;
