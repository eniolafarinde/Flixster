import React from 'react';
import './TrailerOverlay.css';

const TrailerOverlay = ({ trailerKey, isLoading, error, onClose }) => {
  const youtubeEmbedUrl = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0`
    : null;

  return (
    <div className="trailer-overlay-container" onClick={onClose}>
      <div className="trailer-overlay-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-trailer-button" onClick={onClose}>×</span>

        {isLoading ? (
          <div className="trailer-placeholder">Loading trailer...</div>
        ) : error ? (
          <div className="trailer-placeholder trailer-error">
            <p>{error}</p>
          </div>
        ) : youtubeEmbedUrl ? (
          <div className="video-responsive-overlay">
            <iframe
              src={youtubeEmbedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          </div>
        ) : (
          <div className="trailer-placeholder">No trailer available for this movie.</div>
        )}
      </div>
    </div>
  );
};

export default TrailerOverlay;