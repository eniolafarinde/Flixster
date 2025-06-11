import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const api_key = import.meta.env.VITE_API_KEY;
  const baseUrl = 'https://api.themoviedb.org/3';

  // moving fetch function into useEffect to cancel repetition of page load
  useEffect(() => {
    // fetch const
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      const isSearch = searchQuery.trim().length > 0;
      const endpoint = isSearch
        ? `/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchQuery)}&page=${page}`
        : `/movie/now_playing?api_key=${api_key}&page=${page}`;

      const url = `${baseUrl}${endpoint}`;

      const response = await fetch(url);
      if (!response.ok) {
        setError(`HTTP error: ${response.status}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setMovies(prev => (page === 1 ? data.results : [...prev, ...data.results]));
      setLoading(false);
    };

    fetchMovies();
  }, [page, searchQuery]);

  // const to handle load more functionality
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
 // search
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setPage(1);
    setMovies([]);
  };

  if (loading && movies.length === 0) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <main>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      {movies.length > 0 && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </main>
  );
};

export default MovieList;
