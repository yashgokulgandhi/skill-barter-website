import React, { useState, useEffect } from 'react';
import { Edit, Check, User } from 'lucide-react';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null); // New state for file

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('email');
      
      if (!email) {
        setError('No user email found. Please log in.');
        return;
      }

      try {
        // const response = await fetch(`http://localhost:8080/api/user/${email}`, {
        //   method: 'GET',
        //   headers: { 'Content-Type': 'application/json' },
        // });
        const response = await fetch(`https://resilient-enthusiasm-production.up.railway.app/api/user/${email}`, {
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
        // const response = await fetch('http://localhost:8080/api/skills');
        const response = await fetch('https://resilient-enthusiasm-production.up.railway.app/api/api/skills');
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

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  // Separate function to upload the image file
  const uploadImage = async (email) => {
    if (!profileImageFile) return null;
    const formData = new FormData();
    formData.append('file', profileImageFile);
    try {
      console.log(formData.profileImageFile)
      // const response = await axios.post(`http://localhost:8080/api/user/${email}/upload-image`, formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      const response = await axios.post(`https://resilient-enthusiasm-production.up.railway.app/api/user/${email}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        return response.data.profilePicture; // Assuming backend returns updated user with profilePicture field
      }
      setError('Image upload failed.');
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Unable to upload image.');
    }
    return null;
  };

  const handleAddSkill = async () => {
    if (!selectedSkill || !userData) return;
    
    try {
      const email = localStorage.getItem('email');
      // const response = await fetch(`http://localhost:8080/api/user/${email}/skills`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify([parseInt(selectedSkill)]),
      // });
      const response = await fetch(`https://resilient-enthusiasm-production.up.railway.app/api/user/${email}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([parseInt(selectedSkill)]),
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

    // If there is a new image file, upload it first.
    let imageUrl = userData.profilePicture;
    if (profileImageFile) {
      const uploadedImageUrl = await uploadImage(email);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }

    const updatedUser = {
      name: updatedName,
      bio: updatedBio,
      profilePicture: imageUrl, // include new profile picture URL
    };

    try {
      // const response = await fetch(`http://localhost:8080/api/user/${email}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedUser),
      // });
      const response = await fetch(`https://resilient-enthusiasm-production.up.railway.app/api/user/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false);
        setError(null);
        setProfileImageFile(null);
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

          {/* Image upload section when editing */}
          {isEditing && (
            <div className="form-group">
              <label>Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          )}

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
                  .filter((skill) => 
                    !userData.userSkills.some(
                      (us) => us.skill.skillName === skill.skillName
                    )
                  )
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
                  setProfileImageFile(null);
                }}
                className="button secondary"
              >
                Cancel
              </button>
              <button onClick={handleSaveChanges} className="button primary">
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
