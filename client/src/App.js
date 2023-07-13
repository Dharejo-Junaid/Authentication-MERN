import { useEffect, useState } from "react";
import SLBar from "./components/slBar/SLBar";
import LoginForm from "./components/loginForm/LoginForm";
import SignupForm from "./components/signupForm/SignupForm";
import Verity from "./components/verify/Verify";
import axios from "axios";
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
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoSUQiOiIkMmIkMTAkSEh0YWQuZEJiUUttakpndUJmdGI5Lml5M2FSWERRWVlZOFpFWk5FRlFBcEVSaFZrNU16QmUiLCJpYXQiOjE2ODg4NDk0MjZ9.ALxFeJKajIDt3mQI89y4nFIQJhnBalNBvySizJ41HnI";
  if(token) {
    axios.post("/login", {token: token}).then((res) => {
      const { success, message} = res.data;
      console.log(success, message);
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