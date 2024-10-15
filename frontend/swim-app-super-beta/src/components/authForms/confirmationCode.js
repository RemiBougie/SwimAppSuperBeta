import React, {useState} from "react";
import { confirmRegistration, login } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function ConfirmationCode( { username, password }) {
    const [confirmationCode, setConfirmationCode] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleConfirmation = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await confirmRegistration(username, confirmationCode);
            const tokens = await login(username, password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Confirmation failed")
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <form onSubmit={handleConfirmation}>
            <div>
                <label>Check your email for verification code</label>
                <input 
                type="number"
                onChange={(e) => setConfirmationCode(e.target.value)}/>
            </div>
            <button type="submit">Submit</button>
            {error && <p className="error">{error}</p>}
        </form>
    )

}