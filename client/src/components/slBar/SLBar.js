import "./SLBar.css";

const SLBar = ({handleLogin, handleSignup}) => {
    return (
        <header className="slHeader">
            <h2> Auth - MERN </h2>
            <button className="login-btn" onClick={handleLogin}> Login </button>
            <button className="signup-btn" onClick={handleSignup}> Sign up </button>
        </header>
    );
}

export default SLBar;