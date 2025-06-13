import { useState, useEffect } from 'react';

const useMovies = ({ activeView, page, searchQuery, sortOrder, api_key }) => {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const baseUrl = 'https://api.themoviedb.org/3';

useEffect(() => {
const fetchMovies = async () => {
setLoading(true);
setError(null);
let endpoint;
const dateToday = new Date().toISOString().split('T')[0];

if (activeView === 'searchResults' && searchQuery.trim()) {
endpoint = `/search/movie?api_key=${api_key}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
} else {
endpoint = `/discover/movie?api_key=${api_key}&sort_by=${sortOrder}&page=${page}&primary_release_date.lte=${dateToday}`;
}

try {
const response = await fetch(`${baseUrl}${endpoint}`);
if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
const data = await response.json();
setMovies(prev => (page === 1 ? data.results : [...prev, ...data.results]));
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
};

fetchMovies();
}, [page, searchQuery, activeView, sortOrder, api_key]);

return { movies, loading, error, setMovies };
};

export default useMovies;