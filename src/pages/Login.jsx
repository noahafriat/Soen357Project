import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function Login({ onLogin }) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("student");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (!name.trim() && !email.trim()) {
            setError("Please enter your full name and email.");
            return;
        }
        
        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }
        
        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }
        
        const isConcordiaEmail = email.toLowerCase().endsWith("@concordia.ca");
        
        if (!isConcordiaEmail) {
            setError("Only Concordia email addresses can be used to log in.");
            return;
        }

        const user = {
            name: name.trim(),
            email: email.trim(),
            type
        }

        onLogin(user);
        navigate("/browse");
    }


    return (
        <div style={{ padding: "2rem", maxWidth: "400px" }}>
            <h1>Concordia Campus-Only Marketplace Login </h1>
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
                Only Concordia students and professors can access this marketplace.
            </p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{ display: "block", marginBottom: "0.25rem" }}>
                        Name
                    </label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        style={{ width: "100%", padding: "0.4rem" }}
                    />
                </div>
                    
                <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{ display: "block", marginBottom: "0.25rem" }}>
                        Concordia email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="netname@concordia.ca"
                        style={{ width: "100%", padding: "0.4rem" }}
                />
                </div>
                
                <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{ display: "block", marginBottom: "0.25rem" }}>
                        I am a:
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: "100%", padding: "0.4rem" }}
                    >
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                    </select>
                </div>

                {error && (
                    <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
                )}

                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#7b1fa2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Log in
                </button>
            </form>
        </div>
    )
}

export default Login;