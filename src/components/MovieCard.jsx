import React, { useState } from 'react';
import './MovieCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, onClick, onWatchTrailerClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/185x278?text=No+Image';

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };
  const handleLikeButtonClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  const handleWatchedButtonClick = (e) => {
    e.stopPropagation();
    setIsWatched(!isWatched);
  };
  const handleWatchTrailerClick = (e) => {
    e.stopPropagation();
    if (onWatchTrailerClick) {
      onWatchTrailerClick(movie);
    }
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
        <div className="action-buttons">
          <button className={`icon-button ${isLiked ? 'active' : ''}`} onClick={handleLikeButtonClick} aria-label={isLiked ? 'Unlike' : 'Like'} >
            <FontAwesomeIcon icon={isLiked ? fasHeart : farHeart} />
          </button>
          <button className={`icon-button ${isWatched ? 'active' : ''}`} onClick={handleWatchedButtonClick} aria-label={isWatched ? 'Unmark as watched' : 'Mark as watched'} >
            <FontAwesomeIcon icon={isWatched ? fasBookmark : farBookmark} />
          </button>
          <button className="icon-button trailer-button" onClick={handleWatchTrailerClick} aria-label="Watch Trailer">
            <FontAwesomeIcon icon={faPlayCircle} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;