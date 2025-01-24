import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${localStorage.getItem('email')}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setUpdatedName(data.name);
          setUpdatedBio(data.bio);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    const updatedUser = {
      name: updatedName,
      bio: updatedBio,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/user/${localStorage.getItem('email')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setIsEditing(false); // Exit edit mode
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar"></div>
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
            <Edit size={16} />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-details">
          <div className="detail-group">
            <h2>Full Name</h2>
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

          <div className="detail-group">
            <h2>Username</h2>
            <p>{userData.email}</p>
          </div>

          <div className="detail-group">
            <h2>Bio</h2>
            {isEditing ? (
              <textarea
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
              />
            ) : (
              <p>{userData.bio}</p>
            )}
          </div>

          {isEditing && (
            <div className="profile-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
