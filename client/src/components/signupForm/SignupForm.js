import "./SignupForm.css";

const SignupForm = () => {
    return (
        <div className="signup-from-outer-container">
            <div className="signup-from-inner-container">
                <h2>Signup Here</h2>
                <form className="signup-form" action="#" method="post">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" required/>

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required/>

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" min="6" required/>

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password" name="confirmPassword" type="password" min="6" required/>

                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;