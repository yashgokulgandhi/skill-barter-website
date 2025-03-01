import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchPage.css';

function SearchedProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/userbyid/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user profile:", err));
  }, [userId]);

  if (!user) {
    return <div className="search-container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="search-container">
      <div className="user-card">
        <div className="profile-pic-wrapper">
          <img src={user.profilePicture} alt={user.name} className="profile-pic" />
        </div>
        <div className="content-wrapper">
          <h2 className="username">{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Location: {user.location}</p>
          <h3>Skills:</h3>
          <div className="skills-container">
            {(user.userSkills || []).map((skillS, index) => (
              <span key={index} className="skill">{skillS.skill.skillName}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedProfile;
