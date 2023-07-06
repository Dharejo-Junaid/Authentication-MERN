import { useState } from "react";
import SLBar from "./components/slBar/SLBar";
import LoginForm from "./components/loginForm/LoginForm";
import SignupForm from "./components/signupForm/SignupForm";

const App = () => {

  const [isLogin, setIslogin] = useState(true);

  const login = () => {
    setIslogin(true);
  }

  const signup = () => {
    setIslogin(false);
  }

  return(
    <>
      <SLBar handleLogin={login} handleSignup={signup} />
      {isLogin && <LoginForm />}
      {!isLogin && <SignupForm />}
      
    </>
  );
}

export default App;