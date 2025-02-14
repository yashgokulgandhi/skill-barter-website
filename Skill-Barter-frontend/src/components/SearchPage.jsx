import React, { useState } from 'react';
import './SearchPage.css';
import { Search } from 'lucide-react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Static user data for demo purposes
  const users = [
    {
      id: 1,
      username: 'John Doe',
      skills: ['JavaScript', 'React', 'Node.js'],
      profilePic: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      username: 'Jane Smith',
      skills: ['Python', 'Machine Learning', 'Data Science'],
      profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      username: 'Mike Johnson',
      skills: ['Java', 'Spring Boot', 'SQL', 'Docker'],
      profilePic: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop'
    }
  ];

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filteredResults = users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setResults(filteredResults);
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
            <div key={user.id} className="user-card">
              <div className="user-info">
                <div className="profile-pic-wrapper">
                  <img 
                    src={user.profilePic}
                    alt={user.username} 
                    className="profile-pic"
                  />
                </div>
                <div className="content-wrapper">
                  <h3 className="username">{user.username}</h3>
                  <div className="skills-container">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="skill">{skill}</span>
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