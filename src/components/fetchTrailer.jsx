export const fetchTrailer = async (movieId, api_key) => {
    const baseUrl = 'https://api.themoviedb.org/3';
    const url = `${baseUrl}/movie/${movieId}/videos?api_key=${api_key}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch trailers: ${response.status}`);

    const data = await response.json();
    const youtubeTrailers = data.results.filter(
    v => v.site === 'YouTube' && v.type === 'Trailer'
    );

    let trailer = youtubeTrailers.find(v => v.official && v.name.toLowerCase().includes('official trailer'))
        || youtubeTrailers.find(v => v.official)
        || youtubeTrailers[0];

    console.log(data, trailer)
    return trailer?.key || null;
};