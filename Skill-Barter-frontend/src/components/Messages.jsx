import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "../styles/MessageList.css"


function MessageList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedInUserId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();

        // Remove logged-in user and filter out duplicate users based on email
        const uniqueUsers = data
          .filter((user) => user.userId !== loggedInUserId) // Exclude logged-in user
          .filter((user, index, self) => 
            index === self.findIndex((u) => u.email === user.email) // Remove duplicates by email
          );

        setUsers(uniqueUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Search Filter
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="message-list">
      <div className="search-container">
        
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
     

      <div className="messages-container">
        {filteredUsers.length === 0 ? (
          <p className="no-users">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.userId}
              className="message-card"
              onClick={() => navigate(`/chat/${user.userId}`)}
            >
              <div className="avatar">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/100"}
                  alt={user.name}
                  className="avatar-image"
                />
              </div>
              <div className="message-content">
                <h3>{user.name}</h3>
                <p>Tap to chat</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default MessageList;
