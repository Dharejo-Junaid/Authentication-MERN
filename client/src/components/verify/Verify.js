import "./Verify.css";
const Verity = ({handleVerify, verificationMessage}) => {
    return (
        <div className="verify-container">
            <div className="verify">
                <h2>Verify</h2>
                <p>Thank you for signing up! To complete the verification process and gain full access to your account, please click the 'Verify' button below.</p>
                <button id="verify-button" onClick={handleVerify}>Verify</button>
            </div>

            <p>{verificationMessage}</p>
        </div>
    );
}

export default Verity;

