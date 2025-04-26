import React, { useState } from 'react';
import Header from './Header';
import Back from './Logo/Background.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../redux/Userslice'; // Import setLoading action

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [loading, setLoadingState] = useState(false); // UI loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleLogin = async (e) => {
    e.preventDefault();

    // Set loading state in Redux store
    dispatch(setLoading(true));
    setLoadingState(true);  // Set UI loading state

    if (!email || !password) {
      setErrorMessage('Please fill in both fields');
      toast.error('Please fill in both fields');
      dispatch(setLoading(false)); // Stop loading in Redux
      setLoadingState(false); // Stop UI loading state
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log('Login response:', response.data);

      if (response.data.success) {
        setWelcomeMessage(response.data.message);
        toast.success(response.data.message);
        dispatch(setUser(response.data)); // Save user data to Redux

        setTimeout(() => {
          navigate('/browse');
        }, 2000);
      } else {
        setErrorMessage('Invalid credentials');
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during login');
        toast.error(error.response.data.message || 'An error occurred during login');
      } else {
        setErrorMessage('Network error. Please try again later.');
        toast.error('Network error. Please try again later.');
      }
    } finally {
      // Set loading state to false in Redux after request completes
      dispatch(setLoading(false));
      setLoadingState(false); // Stop UI loading state
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register');
  };

  const loginPageStyle = {
    height: '100vh',
    background: `url(${Back}) no-repeat center center/cover`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    color: '#fff',
    overflow: 'hidden',
  };

  const formStyle = {
    background: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
    width: '100%',
    maxWidth: '450px',
    padding: '40px 30px',
    textAlign: 'center',
    backdropFilter: 'blur(8px)',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '12px 0',
    borderRadius: '25px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease-in-out',
  };

  const buttonStyle = {
    background: '#e50914',
    color: '#fff',
    padding: '14px',
    borderRadius: '25px',
    border: 'none',
    width: '100%',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.3s ease-in-out',
    marginTop: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
  };

  // Loading spinner
  const loadingSpinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #e50914',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '10px auto',
  };

  return (
    <div style={loginPageStyle}>
      <Header />
      <div style={formStyle}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Login</h2>
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
        {welcomeMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{welcomeMessage}</div>}
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              id="email"
              disabled={loading} // Disable input while loading
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              id="password"
              disabled={loading} // Disable input while loading
            />
          </div>
          <button style={buttonStyle} type="submit" disabled={loading}>
            {loading ? (
              <>
                <div style={loadingSpinnerStyle}></div> {/* Loading Spinner */}
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div style={{ marginTop: '15px' }}>
          <span
            onClick={handleRedirectToRegister}
            style={{
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Don't have an account? Sign Up here
          </span>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Login;
