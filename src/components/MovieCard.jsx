import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/185x278?text=No+Image';

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie.id);
    }
  };

  const handleLikeButtonClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img src={imageUrl} alt={movie.title} className="movie-poster"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/185x278?text=Image+Error';
        }}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average.toFixed(1)}</p>
        <div className="like-button-container">
          <button className="like-button"  onClick={handleLikeButtonClick} aria-label={isLiked ? 'Unlike' : 'Like'}>
            <span className={`heart-icon ${isLiked ? 'liked' : ''}`}>
              {isLiked ? '♥' : '♡'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;