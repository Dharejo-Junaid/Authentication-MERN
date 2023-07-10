import "./SignupForm.css";
import { useState } from "react";
import axios from "axios";

const SignupForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fromMessage, setFormMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            setFormMessage("Password and Confirm password are not same");
            return;
        }
        
        const res = await axios.post("/signup", {username: username, email: email, password: password});

        const {success, message} = res.data;
        setFormMessage(message);
    }

    return (
        <div className="signup-from-outer-container">
            <div className="signup-from-inner-container">
                <h2>Signup Here</h2>
                <p>{fromMessage}</p>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required/>

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" min="6" value={password} onChange={(event) => setPassword(event.target.value)} required/>

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password" type="password" min="6" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required/>

                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;