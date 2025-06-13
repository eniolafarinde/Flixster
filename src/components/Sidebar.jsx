import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, onClose, favoritedMovies, watchedMovies, onRemoveFavorite, onRemoveWatched }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>

      <div className="sidebar-section">
        <h3><FontAwesomeIcon icon={faHeart} /> Favorited Movies</h3>
        {favoritedMovies.length === 0 ? (
          <p className="no-items-message">No favorited movies yet.</p>
        ) : (
          <ul className="sidebar-movie-list">
            {favoritedMovies.map(movie => (
              <li key={`fav-${movie.id}`} className="sidebar-movie-item">
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Img'} alt={movie.title} className="sidebar-movie-poster" />
                <span className="sidebar-movie-title">{movie.title}</span>
                <span className="sidebar-movie-rating">({movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'})</span>
                <button className="remove-item-btn" onClick={() => onRemoveFavorite(movie.id)} aria-label={`Remove ${movie.title} from favorites`}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <h3><FontAwesomeIcon icon={faBookmark} /> Watched Movies</h3>
        {watchedMovies.length === 0 ? (
          <p className="no-items-message">No watched movies yet.</p>
        ) : (
          <ul className="sidebar-movie-list">
            {watchedMovies.map(movie => (
              <li key={`watched-${movie.id}`} className="sidebar-movie-item">
                 <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138?text=No+Img'} alt={movie.title} className="sidebar-movie-poster" />
                <span className="sidebar-movie-title">{movie.title}</span>
                <span className="sidebar-movie-rating">({movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'})</span>
                <button className="remove-item-btn" onClick={() => onRemoveWatched(movie.id)} aria-label={`Remove ${movie.title} from watched`}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;