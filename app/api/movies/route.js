import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const moodToGenre = {
  melancholy: 18, // Drama
  hopeful: 35, // Comedy
  lonely: 10749, // Romance
  nostalgic: 99, // Documentary as a proxy
  longing: 9648, // Mystery
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get('mood')?.toLowerCase() || 'melancholy';
    const genreId = moodToGenre[mood] || 18;

    if (!TMDB_API_KEY) {
      return NextResponse.json({ error: 'TMDB_API_KEY not set' }, { status: 500 });
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=en-US`;

    console.log('Fetching TMDB URL:', url);

    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json({ error: `TMDB API error: ${res.status} ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();

    const movies = data.results?.slice(0, 5).map(m => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      poster_path: m.poster_path ? `https://image.tmdb.org/t/p/w300${m.poster_path}` : null,
      release_date: m.release_date,
    })) || [];

    return NextResponse.json({ mood, movies });
  } catch (error) {
    console.error('TMDB fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
