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
    profilePicture: 'data:image/png;base64,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', // This can be handled later for image upload
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
