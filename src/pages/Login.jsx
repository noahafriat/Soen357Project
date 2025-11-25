import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import concordiaLogo from '../assets/concordiaLogo.png';

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
      setError("Only Concordia email addresses can be used to log in (netname@concordia.ca).");
      return;
    }

    const user = {
      name: name.trim(),
      email: email.trim(),
      type
    };

    onLogin(user);
    navigate("/browse");
  };

  return (
    <div className="page login-page">
      <div className="login-page__grid">
        {/* Left side */}
        <div className="login-page__branding">
          <img
            src={concordiaLogo}
            alt="Concordia University"
            className="login-page__logo"
          />

          <h1 className="login-page__title">Concordia Marketplace</h1>
          <p className="login-page__subtitle">
            A private buy &amp; sell space for Concordia students and professors.
          </p>

          <ul className="login-page__highlights">
            <li>Only @concordia.ca accounts allowed</li>
            <li>Safer transactions with verified users</li>
            <li>Post textbooks, electronics, tutoring and more</li>
          </ul>
        </div>

        {/* Right side */}
        <div className="login-page__form-card">
          <h2 className="login-page__form-title">Log in to continue</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label">Full name</label>
              <input
                className="form__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div className="form__group">
              <label className="form__label">Concordia email</label>
              <input
                className="form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="netname@concordia.ca"
              />
            </div>

            <div className="form__group">
              <label className="form__label">I am a:</label>
              <select
                className="form__select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="professor">Professor</option>
              </select>
            </div>

            {error && <p className="form__error">{error}</p>}

            <button type="submit" className="btn btn--primary btn--full">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;