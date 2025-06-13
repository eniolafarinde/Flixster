import React from 'react';

const SortControls = ({ sortOrder, onChange }) => (
    <div className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortOrder} onChange={onChange}>
        <option value="popularity.desc">Most Popular</option>
        <option value="original_title.asc">Title (A-Z)</option>
        <option value="release_date.desc">Most Recent</option>
        <option value="vote_average.desc">Highest Rating</option>
        </select>
    </div>
);

export default SortControls;