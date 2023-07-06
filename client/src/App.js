import { useState } from "react";
import SLBar from "./components/slBar/SLBar";
import LoginForm from "./components/loginForm/LoginForm";

const App = () => {

  const login = () => {
    console.log("Login button clicked");
  }

  const signup = () => {
    console.log("Signup button clicked");
  }

  const [isLogin, setIslogin] = useState(true);

  return(
    <>
      <SLBar handleLogin={login} handleSignup={signup} />
      {isLogin && <LoginForm />}
    </>
  );
}

export default App;