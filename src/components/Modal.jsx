import React, { useState, useEffect } from 'react'; 
import './Modal.css';
import { fetchTrailer } from './fetchTrailer';

const Modal = ({ movie, onClose, api_key }) => { 
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(true);
  const [trailerError, setTrailerError] = useState(null);

  useEffect(() => {
    const getTrailer = async () => {
      if (!movie?.id || !api_key) { 
        setTrailerError('Movie ID or API Key missing.');
        setTrailerLoading(false);
        return;
      }
      setTrailerLoading(true);
      setTrailerError(null);
      setTrailerKey(null);
      try {
        const key = await fetchTrailer(movie.id, api_key);
        if (key) {
          setTrailerKey(key);
        } else {
          setTrailerError('No trailer found for this movie.');
        }
      } catch (err) {
        console.error("Error fetching trailer in Modal:", err);
        setTrailerError(`Failed to load trailer: ${err.message || 'Unknown error'}`);
      } finally {
        setTrailerLoading(false);
      }
    };
    getTrailer();
    return () => {
      setTrailerKey(null);
      setTrailerLoading(false); 
      setTrailerError(null);
    };
  }, [movie?.id, api_key]);

  const youtubeEmbedUrl = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0`
    : null;

  if (!movie) return null;

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
          ×
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

        <div className="modal-trailer-section">
          <h3>Trailer</h3>
          <div className="modal-trailer-container">
            {trailerLoading && <p>Loading trailer...</p>}
            {trailerError && <p style={{ color: 'red' }}>{trailerError}</p>}
            {trailerKey && !trailerLoading && !trailerError && (
              <iframe
                src={youtubeEmbedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Movie Trailer"
                className="youtube-iframe" 
              ></iframe>
            )}
            {!trailerLoading && !trailerError && !trailerKey && (
              <p>No trailer available for this movie.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;