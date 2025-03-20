import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const fetchExchanges = async () => {
      
    //   try {
    //     const response = await axios.get(`http://localhost:8080/api/exchanges/${userId}`);
    //     setExchanges(response.data);
    //   } catch (error) {
    //     console.error("❌ Error fetching exchanges:", error);
    //   }
    // };

    try {
      const response = await axios.get(`https://resilient-enthusiasm-production.up.railway.app/api/exchanges/${userId}`);
      setExchanges(response.data);
    } catch (error) {
      console.error("❌ Error fetching exchanges:", error);
    }
  };

    fetchExchanges();
  }, [userId]);

  const handleAction = async (id, action) => {
    try {
      // await axios.post(`http://localhost:8080/api/exchanges/${action}/${id}`);
      await axios.post(`https://resilient-enthusiasm-production.up.railway.app/api/exchanges/${action}/${id}`);
      setExchanges(prevExchanges => prevExchanges.filter(ex => ex.id !== id)); 
    } catch (error) {
      console.error(`❌ Error ${action} exchange:`, error);
    }
  };

  return (
    <div className="exchanges-page">
      <h1>Skill Exchanges</h1>
      
      {/* Ongoing Exchanges Section */}
      <h2>Ongoing Exchanges</h2>
      <div className="exchanges-container">
        {exchanges.filter(ex => ex.status === "ONGOING").length > 0 ? (
          exchanges.filter(ex => ex.status === "ONGOING").map((exchange) => (
            <div key={exchange.id} className="exchange-card">
              <div className="exchange-info">
                <img 
                  src={exchange.userA?.profilePicture || "/default-profile.png"} 
                  alt={exchange.userA?.name || "User"} 
                  className="profile-pic"
                  onError={(e) => { e.target.src = "/default-profile.png"; }}
                />
                <div className="user-info">
                  <h3>{exchange.userA?.name} ↔ {exchange.userB?.name}</h3>
                  <p>{exchange.userA?.name} Shares Skill {exchange.userASkill?.skillName}</p>
                  <p>{exchange.userB?.name} Shares Skill {exchange.userBSkill?.skillName}</p>
                  <p className="exchange-date">
                    Started on: {exchange.createdAt ? new Date(exchange.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              <div className="action-buttons">
                <button className="complete-btn" onClick={() => handleAction(exchange.id, "complete")}>Complete</button>
                <button className="cancel-btn" onClick={() => handleAction(exchange.id, "cancel")}>Cancel</button>
                <button className="chat-btn" onClick={() => navigate(`/chat/${exchange.userA.userId === userId ? exchange.userB.userId : exchange.userA.userId}`)}>Chat</button>
              </div>
            </div>
          ))
        ) : (
          <p>No ongoing exchanges.</p>
        )}
      </div>

      {/* Completed Exchanges Section */}
      <h2>Completed Exchanges</h2>
      <div className="exchanges-container">
        {exchanges.filter(ex => ex.status === "COMPLETED").length > 0 ? (
          exchanges.filter(ex => ex.status === "COMPLETED").map((exchange) => (
            <div key={exchange.id} className="exchange-card">
              <div className="exchange-info">
                <img 
                  src={exchange.userA?.profilePicture || "/default-profile.png"} 
                  alt={exchange.userA?.name || "User"} 
                  className="profile-pic"
                  onError={(e) => { e.target.src = "/default-profile.png"; }}
                />
                <div className="user-info">
                  <h3>{exchange.userA?.name} ↔ {exchange.userB?.name}</h3>
                  <p>{exchange.userA?.name} Shared Skill {exchange.userASkill?.skillName}</p>
                  <p>{exchange.userB?.name} Shared Skill {exchange.userBSkill?.skillName}</p>
                  <p className="exchange-date">
                    Completed on: {exchange.createdAt ? new Date(exchange.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No completed exchanges.</p>
        )}
      </div>
    </div>
  );
};

export default ExchangesPage;
