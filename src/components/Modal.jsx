import React from 'react';
import './Modal.css'; // We'll create this CSS too

const Modal = ({ movie, onClose }) => {
  if (!movie) return null; // Don't render if no movie is selected

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {backdropUrl && (
          <div className="modal-backdrop-image" style={{ backgroundImage: `url(${backdropUrl})` }}>
            <div className="backdrop-overlay"></div>
          </div>
        )}
        <div className="modal-details">
          <img src={imageUrl} alt={movie.title} className="modal-poster" />
          <div className="modal-info">
            <h2>{movie.title}</h2>
            {movie.release_date && <p><strong>Release Date:</strong> {movie.release_date}</p>}
            {movie.vote_average > 0 && <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>}
            <p><strong>Overview:</strong> {movie.overview || 'No overview available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;