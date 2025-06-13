import React, { useState } from 'react';
import useMovies from './useMovies'; 
import { fetchTrailer } from './fetchTrailer'; 
import MovieCard from './MovieCard'; 
import Modal from './Modal';
import TrailerOverlay from './TrailerOverlay';
import SearchBar from './searchBar'; 
import SortControls from './sortControls'; 
import ViewToggleButtons from './viewToggleButtons';
import Sidebar from './Sidebar.jsx';
import './MovieList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import useSidebar from './useSidebar';

const MovieList = () => {
    const api_key = import.meta.env.VITE_API_KEY;
    const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeView, setActiveView] = useState('nowPlaying');
    const [sortOrder, setSortOrder] = useState('popularity.desc');
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showTrailerOverlay, setShowTrailerOverlay] = useState(false);
    const [currentTrailerKey, setCurrentTrailerKey] = useState(null);
    const [trailerLoading, setTrailerLoading] = useState(false);
    const [trailerError, setTrailerError] = useState(null);
    const [likedMoviesIds, setLikedMoviesIds] = useState(() => JSON.parse(localStorage.getItem('likedMoviesIds')) || []);
    const [watchedMoviesIds, setWatchedMoviesIds] = useState(() => JSON.parse(localStorage.getItem('watchedMoviesIds')) || []);

    const toggleLikeMovie = (movie) => { 
        const updatedLikes = likedMoviesIds.some(m => m.id === movie.id)
            ? likedMoviesIds.filter(m => m.id !== movie.id)
            : [...likedMoviesIds, movie]; 
        setLikedMoviesIds(updatedLikes);
        localStorage.setItem('likedMoviesIds', JSON.stringify(updatedLikes)); 
    };
    const toggleWatchedMovie = (movie) => { 
        const updatedWatched = watchedMoviesIds.some(m => m.id === movie.id)
            ? watchedMoviesIds.filter(m => m.id !== movie.id)
            : [...watchedMoviesIds, movie];
        setWatchedMoviesIds(updatedWatched);
        localStorage.setItem('watchedMoviesIds', JSON.stringify(updatedWatched)); 
    };
    const handleRemoveFavorite = (movieId) => {
        const updatedLikes = likedMoviesIds.filter(movie => movie.id !== movieId);
        setLikedMoviesIds(updatedLikes);
        localStorage.setItem('likedMoviesIds', JSON.stringify(updatedLikes));
    };
    const handleRemoveWatched = (movieId) => {
        const updatedWatched = watchedMoviesIds.filter(movie => movie.id !== movieId);
        setWatchedMoviesIds(updatedWatched);
        localStorage.setItem('watchedMoviesIds', JSON.stringify(updatedWatched));
    };
    const { movies, loading, error, setMovies } = useMovies({
        activeView, page, searchQuery, sortOrder, api_key
    });
    const handleSearch = () => {
        setSearchQuery(searchInput.trim());
        setActiveView('searchResults');
        setPage(1);
        setMovies([]);
    };
    const handleClearSearch = () => {
        setSearchInput('');
        setSearchQuery('');
        setActiveView('nowPlaying');
        setPage(1);
        setMovies([]);
    };
    const handleMovieCardClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };
    const handleWatchTrailerClick = async (movie) => {
        setShowTrailerOverlay(true);
        setTrailerLoading(true);
        try {
            const key = await fetchTrailer(movie.id, api_key);
            if (key) {
                setCurrentTrailerKey(key);
            } else {
                setTrailerError('No trailer found.');
            }
        } catch (err) {
            setTrailerError(err.message);
        } finally {
            setTrailerLoading(false);
        }
    };

    return (
        <main>
            <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
                    <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                </button>
                <ViewToggleButtons activeView={activeView} setActiveView={setActiveView} setPage={setPage} setMovies={setMovies} />
                <div className="search-and-sort-container">
                    <SearchBar searchInput={searchInput} onChange={e => setSearchInput(e.target.value)} onSearch={handleSearch} onClear={handleClearSearch} />
                    {activeView === 'nowPlaying' && (
                        <SortControls sortOrder={sortOrder} onChange={e => { setSortOrder(e.target.value); setPage(1); setMovies([]); }} />
                    )}
                </div>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                <div className="movie-grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} onClick={handleMovieCardClick} onWatchTrailerClick={handleWatchTrailerClick} onToggleLike={() => toggleLikeMovie(movie)} onToggleWatched={() => toggleWatchedMovie(movie)} isLiked={likedMoviesIds.some(m => m.id === movie.id)} isWatched={watchedMoviesIds.some(m => m.id === movie.id)} />
                        ))) : ( <p>{loading ? 'Loading...' : 'No movies found.'}</p>
                    )}
                </div>
                {(movies.length > 0 || loading) && (
                    <div className="load-more-container">
                        <button onClick={() => setPage(p => p + 1)} disabled={loading}>
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
                {showModal && selectedMovie && (
                    <Modal movie={selectedMovie} onClose={() => setShowModal(false)} api_key={api_key} />
                )}
                {showTrailerOverlay && ( 
                    <TrailerOverlay trailerKey={currentTrailerKey} isLoading={trailerLoading}  error={trailerError}
                        onClose={() => {
                            setShowTrailerOverlay(false);
                            setCurrentTrailerKey(null);
                            setTrailerError(null);
                        }}
                    />
                )}
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} watchedMovies={watchedMoviesIds} favoritedMovies={likedMoviesIds} onRemoveFavorite={handleRemoveFavorite} onRemoveWatched={handleRemoveWatched}/>
            </div>
        </main>
    );
};

export default MovieList;