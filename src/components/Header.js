import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillLightningFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import Logo from "./Logo/Logo.png";
import { setUser } from '../redux/Userslice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing user and welcome message from Redux store
  const user = useSelector((state) => state.user.user); // Accessing the user object from Redux
  const welcomeMessage = user?.message; // Accessing the message from the nested user object

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  const handleLogoutClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        toast.success('You have logged out successfully!');
        setIsDropdownOpen(false);
        dispatch(setUser(null)); // Reset user state after logout
        navigate('/');
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 25px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.4) 100%)',
    zIndex: 1000,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'background 0.3s ease',
  };

  const logoStyle = {
    width: '90px',
    objectFit: 'contain',
    border: '2px solid #fff',
    borderRadius: '8px',
    padding: '8px',
    transition: 'transform 0.3s ease',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  const searchInputStyle = {
    padding: '10px 15px',
    borderRadius: '20px',
    border: '1px solid #fff',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: '14px',
    outline: 'none',
    marginRight: '10px',
    width: '250px',
    transition: 'all 0.3s ease',
  };

  const searchButtonStyle = {
    background: '#e50914',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '20px',
    fontSize: '14px',
    marginRight: '15px',
    transition: 'background 0.3s ease',
  };

  const logoutButtonStyle = {
    background: '#e50914',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background 0.3s ease',
  };

  const welcomeTextStyle = {
    color: '#fff',
    fontSize: '14px',
    marginRight: '10px',
    fontWeight: '500',
  };

  const dropdownBoxStyle = {
    position: 'absolute',
    right: '25px',
    top: '70px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    width: '150px',
    display: isDropdownOpen ? 'block' : 'none',
    transition: 'all 0.3s ease',
    opacity: isDropdownOpen ? 1 : 0,
    pointerEvents: isDropdownOpen ? 'auto' : 'none',
  };

  const dropdownItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    color: '#333',
    fontSize: '14px',
    textAlign: 'center',
    transition: 'background 0.2s ease',
  };

  const handleProfileClick = () => {
    alert('Profile clicked');
  };

  const handleSettingsClick = () => {
    alert('Settings clicked');
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#f4f4f4',
  };

  return (
    <div style={headerStyle}>
      <div style={logoContainerStyle}>
        <img
          src={Logo}
          alt="Logo"
          style={logoStyle}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        <AiOutlineHome style={{ color: '#fff', fontSize: '24px', marginLeft: '15px', cursor: 'pointer' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies..."
          style={searchInputStyle}
        />
        <button style={searchButtonStyle} onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <BsFillLightningFill style={{ color: '#fff', fontSize: '20px', marginRight: '10px', cursor: 'pointer' }} />
        
        {/* Display welcome message */}
        <span style={welcomeTextStyle}>
          {welcomeMessage || 'Welcome Cinephile'}
        </span>

        <div style={{ position: 'relative' }}>
          <button
            style={logoutButtonStyle}
            onClick={toggleDropdown}
          >
            <FaUserCircle style={{ marginRight: '5px' }} />
            Logout
          </button>

          {/* Dropdown Menu */}
          <div style={dropdownBoxStyle}>
            <div
              style={dropdownItemStyle}
              onClick={handleProfileClick}
              onMouseOver={(e) => e.target.style = dropdownItemHoverStyle}
              onMouseOut={(e) => e.target.style = dropdownItemStyle}
            >
              Profile
            </div>
            <div
              style={dropdownItemStyle}
              onClick={handleSettingsClick}
              onMouseOver={(e) => e.target.style = dropdownItemHoverStyle}
              onMouseOut={(e) => e.target.style = dropdownItemStyle}
            >
              Settings
            </div>
            <div
              style={dropdownItemStyle}
              onClick={handleLogoutClick}
              onMouseOver={(e) => e.target.style = dropdownItemHoverStyle}
              onMouseOut={(e) => e.target.style = dropdownItemStyle}
            >
              <IoLogOutOutline style={{ marginRight: '5px' }} />
              Logout
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Header;
