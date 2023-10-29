import React, { useState } from "react";
import "./combine.css";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const temail = document.getElementById('email').value;
        const tphone = document.getElementById('phone').value;
        console.log(`Logging in with ${temail ? 'Email' : 'Phone'}`);
        try {
            const password = pass;
            let role = "farmer";
            const body = { email, password, phone, fname, lname, role};
            console.log(body);
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            alert(`Farmer ${fname} registered successfully!`)
            window.location = "/";
        if (!temail && !tphone) {
            alert('Both email and phone cannot be empty');
            return false;
        }} catch(err) {
            console.log(err.message);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form id="regform" className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="fname" aria-required>First name</label>
            <input value={fname} name="fname" required onChange={(e) => setFname(e.target.value)} id="name" placeholder="First Name" />
            </div>
            <div className="form-group">
            <label htmlFor="lname" >Last name</label>
            <input value={lname} name="lname" required onChange={(e) => setLname(e.target.value)} id="name" placeholder="Last Name" />
            </div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="phone">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)}type="tel" placeholder="9876543210" id="phone" name="phone" />
            <label htmlFor="password">Password</label>
            <input value={pass}  required onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" className="mb-3" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
            <button type="submit btn-submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}