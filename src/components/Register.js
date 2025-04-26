import React, { useState } from 'react';
import Header from './Header';
import Back from './Logo/Background.jpg'; // Ensure the background image path is correct
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import axios from 'axios'; // Import axios to make API requests
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast for notifications
import Subscription from './subscription';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // For error messages
  const [successMessage, setSuccessMessage] = useState(''); // For success messages
  const navigate = useNavigate(); // Hook to access navigate for redirection

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    // Input validation
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        email,
        password,
      });

      console.log('Register response:', response.data);

      if (response.data.success) {
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
        toast.success('Registration successful!'); // Display success toast
        setUsername('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/'); // Navigate to the login page after success
        }, 2000);
      } else {
        setErrorMessage(response.data.message || 'Registration failed');
        setSuccessMessage('');
        toast.error(response.data.message || 'Registration failed'); // Display error toast
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Need to go to Login');
      setSuccessMessage('');
      toast.success('Already Registered go for Login');
      setTimeout(() => {
        navigate('/subscription'); // Navigate to the subscription page on error
      }, 2000);
      toast.success("Need Subscription to get the best experience")
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/'); // Redirect to login page
  };

  // Inline styles for the register page
  const registerPageStyle = {
    height: '100vh',
    background: `url(${Back}) no-repeat center center/cover`, // Correct background image usage
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    color: '#fff',
  };

  const formStyle = {
    background: 'rgba(0, 0, 0, 0.7)', // Increased opacity for better contrast
    padding: '40px 30px', // Adjusted padding for more space
    borderRadius: '12px', // More rounded corners for a modern look
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', // Stronger shadow for depth
    width: '100%',
    maxWidth: '500px', // Increased width for more comfortable input fields
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out', // Added fadeIn animation for smoother appearance
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '12px 0',
    borderRadius: '8px', // Rounded corners for input fields
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  };

  const buttonStyle = {
    background: '#e50914',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px', // Rounded corners for the button
    border: 'none',
    width: '100%',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 0.3s ease-in-out',
    marginTop: '15px',
  };

  const buttonHoverStyle = {
    background: '#f40612',
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div style={registerPageStyle}>
      <Header />
      <div style={formStyle}>
        <h2 style={{ marginBottom: '20px' }}>Register</h2>

        {/* Display success or error messages */}
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => handleChange(e, setUsername)}
              style={inputStyle}
              aria-label="Username"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              style={inputStyle}
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
              style={inputStyle}
              aria-label="Password"
            />
          </div>

          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.background)}
            onMouseOut={(e) => (e.target.style.background = buttonStyle.background)}
            type="submit"
          >
            Register
          </button>
        </form>

        <div style={{ marginTop: '20px' }}>
          <span
            onClick={handleRedirectToLogin}
            style={{
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px',
            }}
          >
            Already have an account? Login here
          </span>
        </div>
      </div>

      {/* Include the Toaster component for showing toast notifications */}
      <Toaster />
    </div>
  );
};

export default Register;
