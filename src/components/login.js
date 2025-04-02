import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../services/apiService';
import { trackComponentPerformance, useTelemetry } from 'tele-track-sdk';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { trackEvent } = useTelemetry();

    // Check and clear token on component mount
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Track login attempt 
            trackEvent('login_attempt', { email, password });

            const response = await login({ email, password });
            // Check if response has access_token
            if (response && response.access_token) {
                // Store token in localStorage
                localStorage.setItem('token', response.access_token);

                // Successfully logged in and got token, track successful login 
                trackEvent('login_successful', { email, password });

                navigate('/');
            } else {
                setError('Login failed. No access token received.');
                 // Track failed login
                 trackEvent('login_failed', { 
                    email,
                    reason: 'No access token received'
                  });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '1.5rem'
                }}>Login</h2>
                {error && <p style={{
                    color: '#dc3545',
                    textAlign: 'center',
                    marginBottom: '1rem'
                }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#555'
                        }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#555'
                        }}>Password:</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '1rem'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? 
                                    <EyeOff size={20} color="#555" /> : 
                                    <Eye size={20} color="#555" />
                                }
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#0056b3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            marginBottom: '1rem'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#004494'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}
                    >
                        Login
                    </button>
                    <p style={{ textAlign: 'center', margin: '0' }}>
                        Don't have an account?{' '}
                        <a
                            href="/signup"
                            style={{ color: '#0056b3', textDecoration: 'none' }}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/auth/signup');
                            }}
                        >
                            Sign up here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default trackComponentPerformance({
    componentName: 'LoginForm',
    slowRenderThreshold: 50,
    trackMounts: true,
    trackRenders: true,
    trackUnmounts: true
})(Login);