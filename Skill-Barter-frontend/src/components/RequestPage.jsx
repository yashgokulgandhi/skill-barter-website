import React from 'react';
import '../styles/RequestPage.css';

const RequestPage = () => {
  // Mock data for requests - in a real app this would come from your backend
  const requests = [
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      skill: "Programming",
      date: "2024-03-10"
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      skill: "Photography",
      date: "2024-03-09"
    }
  ];

  const handleAccept = (id) => {
    console.log(`Accepted request ${id}`);
    // Add your accept logic here
  };

  const handleDecline = (id) => {
    console.log(`Declined request ${id}`);
    // Add your decline logic here
  };

  return (
    <div className="request-page">
      <h1>Skill Exchange Requests</h1>
      <div className="requests-container">
        {requests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-info">
              <img 
                src={request.profilePic} 
                alt={request.name} 
                className="profile-pic"
              />
              <div className="user-info">
                <h3>{request.name}</h3>
                <p>Skill: {request.skill}</p>
                <p className="request-date">Requested on: {request.date}</p>
              </div>
            </div>
            <div className="action-buttons">
              <button 
                className="accept-btn"
                onClick={() => handleAccept(request.id)}
              >
                Accept
              </button>
              <button 
                className="decline-btn"
                onClick={() => handleDecline(request.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestPage;