import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/185x278?text=No+Image';

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie.id);
    }
  };

  return (
    <div className="movie-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img
        src={imageUrl}
        alt={movie.title}
        className="movie-poster"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/185x278?text=Image+Error';
        }}
      />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.vote_average.toFixed(1)}</p>
    </div>
  );
};

export default MovieCard;