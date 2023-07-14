import SLBar from "./components/slBar/SLBar";
import LoginForm from "./components/loginForm/LoginForm";
import SignupForm from "./components/signupForm/SignupForm";
import Verity from "./components/verify/Verify";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";

const App = () => {

  const [isLogin, setIslogin] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [searchParams] = useSearchParams();

  const login = () => {
    setIslogin(true);
  }

  const signup = async () => {
    setIslogin(false);
  }

  const verify = async () => {
    const hashID = searchParams.get("hashID");
    
    const res = await axios.get(`/verify?hashID=${hashID}`);
    const {success, message, token} = res.data;
    
    setVerificationMessage(message);

    if(success) {
      localStorage.setItem("token", token);
    }
  }

  const token = localStorage.getItem("token");

  if(token) {
    axios.post("/login", {token: token}).then((res) => {
      // const { success, message} = res.data;
      // redirect to dashboard;
    });
  }

  return (
    <Routes>
      <Route exact path="/" element={
        <>
          <SLBar handleLogin={login} handleSignup={signup}/>
          {isLogin? <LoginForm/> : <SignupForm/>}
        </>
      }/>
      <Route exact path="/verify" 
        element={
        <Verity 
          handleVerify={verify} 
          verificationMessage={verificationMessage}
        />}
      />
    </Routes>
  );
  
  
}

export default App;