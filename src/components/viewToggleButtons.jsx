import React from 'react';

const ViewToggleButtons = ({ activeView, setActiveView, setPage, setMovies }) => {
const handleNowPlayingClick = () => {
setActiveView('nowPlaying');
setPage(1);
setMovies([]);
};

const handleSearchViewClick = () => {
setActiveView('searchResults');
setPage(1);
setMovies([]);
};

return (
<div className="view-toggle-buttons">
<button className={activeView === 'nowPlaying' ? 'active' : ''} onClick={handleNowPlayingClick}>
Now Playing
</button>
<button className={activeView === 'searchResults' ? 'active' : ''} onClick={handleSearchViewClick}>
Search Results
</button>
</div>
);
};

export default ViewToggleButtons;