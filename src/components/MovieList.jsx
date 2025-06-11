import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState([1])

    // moving the fetchMovies const into useEffect to cancel repetition of page
    useEffect(() => {
        // to fetch movies
        const fetchMovies = async () => {
        const api_key = import.meta.env.VITE_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${page}`;
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
            setError(`HTTP error: ${response.status}`);
            setLoading(false);
            return;
        }
        const data = await response.json();
        setMovies(prev => [...prev, ...data.results]);
        setLoading(false);
    };
        fetchMovies();
    }, [page]);
    
    // const to handle load-more functionality
    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    if (loading && movies.length === 0) return <p>Loading movies...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <main>
            <div className="movie-grid">
            {movies.length > 0 ? (
            movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
            ))
            ) : (
            <p>No movies found.</p>
            )}
            </div>
            <div className="load-more-container">
                <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </main>
    );

};

export default MovieList;


