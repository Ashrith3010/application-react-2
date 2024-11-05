import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginBackground from '../styles/1.webp';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userType', data.userType);
                localStorage.setItem('username', data.username);
                setMessage('Login successful! Redirecting...');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('Server error. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <div
                className="login-illustration"
                style={{
                    backgroundImage: `url(${loginBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            <div className="login-form">
                <h2 className="form-welcome">Welcome back</h2>
                <p className="login-subtitle">Login with your username, email, or phone number</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="Username / Email / Phone"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="switch-form">
                    <a href="/register">Create Account</a> | <a href="#">Forgot Password?</a>
                </p>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;