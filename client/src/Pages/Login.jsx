import React, { useState } from "react";

export const Login = (props) => {
    const [activeTab, setActiveTab] = useState('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log(`Logging in with ${activeTab === 'email' ? 'Email' : 'Phone'}`);
        try {
            const password = pass;
            const body = { email, password, phone };
            console.log(body);
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            alert("You've logged in successfully!")
            window.location = "/";
        } catch(err) {
            console.log(err.message);
        }
      };

    return (
        <div className="auth-form-container">
            <div className="titlee">
        <h2 className="login-title">Login</h2>
            </div>
        <div className="tab-buttons">
        <button
          onClick={() => handleTabSwitch('email')}
          className={activeTab === 'email' ? 'active tabe' : 'tabe'}
        >
          Email
        </button>
        <button
          onClick={() => handleTabSwitch('phone')}
          className={activeTab === 'phone' ? 'active tabp' : 'tabp'}
        >
          Phone
        </button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
        {activeTab === 'email' && (
          <>
            <label htmlFor="email" className="mt-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ex: youremail@gmail.com"
              id="email"
              name="email"
              className=""
            />
          </>
        )}
        {activeTab === 'phone' && (
          <>
            <label htmlFor="phone" className="mt-2">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="ex: 9876543210"
              id="phone"
              name="phone"
              className=""
            />
          </>
        )}
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password" className="passin"
        />
        <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here.
        </button>
    </div>
    )
}