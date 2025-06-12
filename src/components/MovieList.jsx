import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard.jsx';
import Modal from './Modal';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('nowPlaying');
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOrder, setSortOrder] = useState('popularity.desc');

  const api_key = import.meta.env.VITE_API_KEY;
  const baseUrl = 'https://api.themoviedb.org/3';

  // Fetch Movies Effect
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      let endpoint;
      if (activeView === 'searchResults' && searchQuery.trim().length > 0) {
        endpoint = `/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
      } else {
        endpoint = `/discover/movie?api_key=${api_key}&sort_by=${sortOrder}&page=${page}&primary_release_date.lte=${new Date().toISOString().split('T')[0]}`;
      }
      const url = `${baseUrl}${endpoint}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setMovies(prev => (page === 1 ? data.results : [...prev, ...data.results]));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchQuery, activeView, api_key, sortOrder]);

  //const to handle load more functionality
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  //search 
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setActiveView('nowPlaying');
      setSearchQuery('');
      setPage(1);
      setMovies([]);
      setSortOrder('popularity.desc');
      return;
    }
    setActiveView('searchResults');
    setSearchQuery(searchInput);
    setPage(1);
    setMovies([]);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setActiveView('nowPlaying');
    setPage(1);
    setMovies([]);
    setSortOrder('popularity.desc');
  };


  const handleNowPlayingClick = () => {
    setActiveView('nowPlaying');
    setSearchQuery('');
    setSearchInput('');
    setPage(1);
    setMovies([]);
    setSortOrder('popularity.desc'); 
  };

  const handleSearchViewClick = () => {
    setActiveView('searchResults');
    if (searchQuery.trim() === '') {
      setMovies([]);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1); 
    setMovies([]);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  if (loading && movies.length === 0) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <main>
      <div className="view-toggle-buttons">
        <button className={activeView === 'nowPlaying' ? 'active' : ''} onClick={handleNowPlayingClick}>
          Now Playing
        </button>
        <button className={activeView === 'searchResults' ? 'active' : ''} onClick={handleSearchViewClick} disabled={searchQuery.trim() === '' && activeView !== 'searchResults'}>
          Search Results
        </button>
      </div>

      <div className="search-and-sort-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClearSearch} className="clear-button">Clear</button>
        </div>

        {activeView === 'nowPlaying' && (
          <div className="sort-controls">
            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by" value={sortOrder} onChange={handleSortChange}>
              <option value="popularity.desc">Popularity </option>
              <option value="original_title.asc">Title (A-Z)</option>
              <option value="release_date.desc">Release Date (Most Recent)</option>
              <option value="vote_average.desc">Vote Average (Highest)</option>
            </select>
          </div>
        )}
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />)
        ) : (
          <p>
            {loading ? "Loading..." : (activeView === 'searchResults' && searchQuery.trim() === '' ? "Enter a search term to find movies." : "No movies found.")}
          </p>
        )}
      </div>

      {(activeView === 'nowPlaying' || (activeView === 'searchResults' && movies.length > 0)) && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {showModal && selectedMovie && (
        <Modal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default MovieList;