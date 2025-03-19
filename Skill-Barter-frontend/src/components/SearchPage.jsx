import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import { Search } from 'lucide-react';
import axios from 'axios';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Page index starts at 0
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Retrieve the current user ID from localStorage
  const currentUserId = localStorage.getItem('userId');

  // Fetch search results from the server
  const fetchResults = async (searchQuery, page) => {
    if (searchQuery.trim() === '') {
      setResults([]);
      setTotalPages(0);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/users/search", {
        params: {
          query: searchQuery,
          page: page,
          size: itemsPerPage,
          currentUserId: currentUserId
        }
      });

      setResults(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Trigger search on input change
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    fetchResults(searchQuery, 0);
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchResults(query, newPage);
    }
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
                      <span key={index} className="skill">
                        {skillS.skill.skillName}
                      </span>
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage + 1 === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
