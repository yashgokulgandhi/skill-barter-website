import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../styles/MessageList.css';

function MessageList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="message-list">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="messages-container">
        {filteredUsers.map((user) => (
          <div
            key={user.userId}
            className="message-card"
            onClick={() => navigate(`/chat/${user.userId}`)}
          >
            <div className="avatar">
              <img
                src={user.profilePicture || 'https://via.placeholder.com/100'}
                alt={user.name}
                className="avatar-image"
              />
            </div>
            <div className="message-content">
              <h3>{user.name}</h3>
              <p>{user.bio || "No bio available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessageList;
