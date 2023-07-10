import { useState } from "react";
import SLBar from "./components/slBar/SLBar";
import LoginForm from "./components/loginForm/LoginForm";
import SignupForm from "./components/signupForm/SignupForm";
import axios from "axios";

const App = () => {

  const [isLogin, setIslogin] = useState(true);

  const login = () => {
    setIslogin(true);
  }

  const signup = () => {
    setIslogin(false);
  }

  /*
  const token = localStorage.getItem("token");
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoSUQiOiIkMmIkMTAkSEh0YWQuZEJiUUttakpndUJmdGI5Lml5M2FSWERRWVlZOFpFWk5FRlFBcEVSaFZrNU16QmUiLCJpYXQiOjE2ODg4NDk0MjZ9.ALxFeJKajIDt3mQI89y4nFIQJhnBalNBvySizJ41HnI";
  if(token) {
    axios.post("/login", {token: token}).then((res) => {
      const { success, message, token: newToken } = res.data;

      if(success) {
        localStorage.setItem("token", newToken);
        console.log(success, message, newToken);
      }
    });
  }
  */

  return(
    <>
      <SLBar handleLogin={login} handleSignup={signup} />
      {isLogin? <LoginForm /> : <SignupForm />}
    </>
  );
  
  
}

export default App;