import React, { useState, useEffect } from 'react';
import { Edit, Check, User } from 'lucide-react';


function App() {
  const [userData, setUserData] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]); // Available skills list
  const [selectedSkill, setSelectedSkill] = useState(''); // Selected skill to add

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('email');
      
      if (!email) {
        setError('No user email found. Please log in.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/user/${email}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

          
          const data = await response.json();
          console.log(data)
          setUserData(data);
          setUpdatedName(data.name);
          setUpdatedBio(data.bio);
          setError(null);
        } else {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch user data' }));
          setError(errorData.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError('Unable to connect to the server. Please try again later.');
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/skills');
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          setError('Failed to fetch skills.');
        }
      } catch {
        setError('Error fetching skills.');
      }
    };


    fetchUserData();
    fetchSkills();
  }, []);

  
  const handleAddSkill = async () => {
    if (!selectedSkill || !userData) return;

    try {
      const email = localStorage.getItem('email');
      const response = await fetch(`http://localhost:8080/api/user/${email}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([parseInt(selectedSkill)]), // Convert skill ID to number
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setSelectedSkill('');
      } else {
        setError('Failed to add skill.');
      }
    } catch {
      setError('Unable to connect to the server.');
    }
  }; 


  const handleSaveChanges = async () => {
    if (!userData) return;
    
    const email = localStorage.getItem('email');
    if (!email) {
      setError('No user email found. Please log in.');
      return;
    }

    const updatedUser = {
      name: updatedName,
      bio: updatedBio,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/user/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
        setError(null);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to update profile' }));
        setError(errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Unable to connect to the server. Please try again later.');
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-message">{error}</div>
          <button onClick={() => window.location.reload()} className="button primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-info">
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt={userData.name}
                className="profile-picture"
              />
            ) : (
              <div className="profile-picture-placeholder">
                <User size={80} className="user-icon" />
              </div>
            )}
            <div className="profile-text">
              <h1 className="profile-name">{userData.name}</h1>
              <p className="profile-date">Member since {new Date(userData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            className="button edit-button"
          >
            {isEditing ? (
              <>
                <Check size={18} />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit size={18} />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="profile-content">
          <div className="form-group">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <p>{userData.email}</p>
          </div>

          <div className="form-group">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
                rows={4}
              />
            ) : (
              <p>{userData.bio}</p>
            )}
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="skills-container">
              {userData.userSkills.length > 0 ? (
                userData.userSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.skill.skillName}
                  </span>
                ))
              ) : (
                <p className="no-skills">No skills added yet</p>
              )}
            </div>
          </div>

{/* Add Skills Section */}
          <div className="form-group">
            <label>Add Skills</label>
            <div className="skill-selection">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">Select a skill</option>
                {skills
                  .filter((skill) => !userData.userSkills.includes(skill.skillName))
                  .map((skill) => (
                    <option key={skill.skillId} value={skill.skillId}>
                      {skill.skillName}
                    </option>
                  ))}
              </select>
              <button onClick={handleAddSkill} disabled={!selectedSkill}>
                Add
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Reviews</label>
            <div className="reviews-grid">
              <div className="review-stat">
                <p className="stat-label">Reviews Given</p>
                <p className="stat-value">{userData.reviewsGiven.length}</p>
              </div>
              <div className="review-stat">
                <p className="stat-label">Reviews Received</p>
                <p className="stat-value">{userData.reviewsReceived.length}</p>
              </div>
            </div>
          </div>

          
          {isEditing && (
            <div className="button-group">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUpdatedName(userData.name);
                  setUpdatedBio(userData.bio);
                }}
                className="button secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="button primary"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;