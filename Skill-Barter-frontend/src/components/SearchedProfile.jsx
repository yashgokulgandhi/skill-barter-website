import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SearchPage.css";

function SearchedProfile() {
  const { userId } = useParams(); // Searched user ID
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [searchedUserSkill, setSearchedUserSkill] = useState("");
  const [message, setMessage] = useState(""); // New state for request message
  const loggedInUserId = localStorage.getItem("userId"); // Logged-in user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch searched user's profile
        // const userResponse = await axios.get(`http://localhost:8080/api/userbyid/${userId}`);
        // setUser(userResponse.data);

        // // Fetch logged-in user's skills
        // const skillsResponse = await axios.get(`http://localhost:8080/api/userbyid/${loggedInUserId}`);
        // setSkills(skillsResponse.data.userSkills);

        const userResponse = await axios.get(`https://resilient-enthusiasm-production.up.railway.app/userbyid/${userId}`);
        setUser(userResponse.data);

        // Fetch logged-in user's skills
        const skillsResponse = await axios.get(`https://resilient-enthusiasm-production.up.railway.app/userbyid/${loggedInUserId}`);
        setSkills(skillsResponse.data.userSkills);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, loggedInUserId]);

  const handleRequest = async () => {
    if (!selectedSkill || !searchedUserSkill || !message) {
      alert("Please select both skills and enter a message.");
      return;
    }

    const requestData = {
      userAId: Number(loggedInUserId),
      userASkillId: Number(selectedSkill),
      userBId: Number(userId),
      userBSkillId: Number(searchedUserSkill),
      requestMessage: message,
    };

    console.log("Sending request with data:", requestData);

    try {
      // const response = await axios.post(
      //   "http://localhost:8080/api/requests/create",
      //   null,
      //   { params: requestData }
      // );
      
      const response = await axios.post(
        "https://resilient-enthusiasm-production.up.railway.app/requests/create",
        null,
        { params: requestData }
      );
      console.log("Response:", response.data);
      alert(response.data);
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request.");
    }
  };

  if (!user) {
    return (
      <div className="search-container">
        <p>Loading profile...</p>
      </div>
    );
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
          <h3>Skills:</h3>
          <div className="skills-container">
            {(user.userSkills || []).map((skillS, index) => (
              <span key={index} className="skill">{skillS.skill.skillName}</span>
            ))}
          </div>
        </div>
        <div className="request-container">
          <h3>Send a Request</h3>
          <label>Your Skill:</label>
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
            <option value="">Select your skill</option>
            {skills.map((skill) => (
              <option key={skill.userSkillId} value={skill.userSkillId}>
                {skill.skill.skillName}
              </option>
            ))}
          </select>

          <label>{user.name}'s Skill:</label>
          <select value={searchedUserSkill} onChange={(e) => setSearchedUserSkill(e.target.value)}>
            <option value="">Select their skill</option>
            {(user.userSkills || []).map((skillS) => (
              <option key={skillS.userSkillId} value={skillS.userSkillId}>
                {skillS.skill.skillName}
              </option>
            ))}
          </select>

          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          ></textarea>

          <button onClick={handleRequest}>Send Request</button>
        </div>
      </div>
    </div>
  );
}

export default SearchedProfile;
