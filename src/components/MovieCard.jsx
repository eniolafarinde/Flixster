import React from 'react';
import './MovieCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, onClick, onWatchTrailerClick, isLiked, isWatched, onToggleLike, onToggleWatched }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/185x278?text=No+Image';

  const cardClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };
  const handleLikeButtonClick = (e) => {
    e.stopPropagation();
    if (onToggleLike) {
      onToggleLike(movie);
    }
  };
  const handleWatchedButtonClick = (e) => {
    e.stopPropagation();
    if (onToggleWatched) {
      onToggleWatched(movie); 
    }
  };
  const watchTrailer = (e) => {
    e.stopPropagation();
    if (onWatchTrailerClick) {
      onWatchTrailerClick(movie);
    }
  };

  return (
    <div className="movie-card" onClick={cardClick}>
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
        <button
        className={`icon-button ${isLiked ? 'active' : ''}`}
        onClick={handleLikeButtonClick}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        >
        <FontAwesomeIcon icon={isLiked ? fasHeart : farHeart} />
        </button>

        <button
        className={`icon-button ${isWatched ? 'active' : ''}`}
        onClick={handleWatchedButtonClick}
        aria-label={isWatched ? 'Unmark as watched' : 'Mark as watched'}
        >
        <FontAwesomeIcon icon={isWatched ? fasBookmark : farBookmark} />
        </button>
          <button className="icon-button trailer-button" onClick={watchTrailer} aria-label="Watch Trailer">
            <FontAwesomeIcon icon={faPlayCircle} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;