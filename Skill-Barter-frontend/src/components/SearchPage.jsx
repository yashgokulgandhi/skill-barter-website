import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import { Search } from 'lucide-react';
import axios from 'axios';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]); 
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filteredResults = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.userSkills || []).some(skillS =>
        skillS.skill.skillName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setResults(filteredResults);
  };

  const handleUserClick = (userId) => {
    navigate(`/searched-profile/${userId}`);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by skill or username..."
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((user) => (
            <div key={user.userId} className="user-card" onClick={() => handleUserClick(user.userId)}>
              <div className="user-info">
                <div className="profile-pic-wrapper">
                  <img src={user.profilePicture} alt={user.name} className="profile-pic" />
                </div>
                <div className="content-wrapper">
                  <h3 className="username">{user.name}</h3>
                  <div className="skills-container">
                    {(user.userSkills || []).map((skillS, index) => (
                      <span key={index} className="skill">{skillS.skill.skillName}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          query.trim() !== '' && <p className="no-results">No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
