import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RequestPage.css';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const navigate=useNavigate();// Assume userId is stored after login

  useEffect(() => {
    if (!userId) return;

    const fetchRequests = async () => {
      try {
        // const response = await axios.get(`http://localhost:8080/api/requests/pending/${userId}`);
        const response = await axios.get(`https://resilient-enthusiasm-production.up.railway.app/api/requests/pending/${userId}`);
        setRequests(response.data);
      } catch (error) {
        console.error("❌ Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleAction = async (id, action) => {
    try {
      // await axios.post(`http://localhost:8080/api/requests/${action}/${id}`);
      await axios.post(`https://resilient-enthusiasm-production.up.railway.app/api/requests/${action}/${id}`);

      setRequests(prevRequests => prevRequests.filter(req => req.id !== id)); // Remove accepted/declined request
    } catch (error) {
      console.error(`❌ Error ${action} request:`, error);
    }

    if(action=='accept')
    {
      navigate('/exchanges')
    }
  };

  return (
    <div className="request-page">
      <h1>Skill Exchange Requests</h1>
      <div className="requests-container">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-info">
                <img 
                  src={request.userA?.profilePicture || "/default-profile.png"} 
                  alt={request.userA?.name || "User"} 
                  className="profile-pic"
                  onError={(e) => { e.target.src = "/default-profile.png"; }} // Handle broken images
                />
                <div className="user-info">
                  <h3>{request.userA?.name || "Unknown User"}</h3>
                  <p>Skill: {request.userASkill?.skillName || "Unknown Skill"}</p>
                  <p className="request-message">Message: {request.requestMessage || "No message provided."}</p>
                  <p className="request-date">
                    Requested on: {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
              <div className="action-buttons">
                <button className="accept-btn" onClick={() => handleAction(request.id, "accept")}>Accept</button>
                <button className="decline-btn" onClick={() => handleAction(request.id, "decline")}>Decline</button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default RequestPage;
