import { NextResponse } from 'next/server';

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const moodToKeywords = {
  melancholy: 'melancholy sadness poetry',
  hopeful: 'hope inspiration self-help',
  lonely: 'loneliness fiction emotional',
  nostalgic: 'nostalgia memoirs',
  longing: 'longing romance',
  // add more moods and keywords
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood')?.toLowerCase() || 'melancholy';

  const keywords = moodToKeywords[mood] || moodToKeywords.melancholy;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keywords)}&maxResults=5&key=${GOOGLE_BOOKS_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const books = data.items?.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors?.join(', '),
    description: item.volumeInfo.description,
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    infoLink: item.volumeInfo.infoLink,
  })) || [];

  return NextResponse.json({ mood, books });
}
