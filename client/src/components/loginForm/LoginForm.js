import "./LoginForm.css";

const LoginForm = () => {
    return (
        <div className="login-from-outer-container">
            <div className="login-from-inner-container">
                <h2>Login Here</h2>
                <form className="login-form" action="#" method="post">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" required/>

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" min="6" required/>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;