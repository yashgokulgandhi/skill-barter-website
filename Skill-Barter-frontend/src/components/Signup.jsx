import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    profilePicture: '', // This can be handled later for image upload
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', formData);
      console.log('User registered:', response.data);
      navigate('/'); // Navigate to login or dashboard
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <h1>SkillBarter</h1>
        <Sparkles className="sparkle-icon" size={24} />
      </div>
      <div className="auth-box">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          {['name', 'email', 'password', 'bio'].map((field) => (
            <div key={field} className="form-group">
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            </div>
          ))}
          <button type="submit" className="auth-button">
            Sign Up
          </button> 
        </form>
        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
