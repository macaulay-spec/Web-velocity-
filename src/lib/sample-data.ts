// ─── JagFlix Sample Data (Fallback) ───────────────────────────────────
// Rich sample data so the app always renders beautifully
// even when the ZST Labs API is unreachable

import type {
  HomepageData, HeroBanner, HomepageSection, HomepageItem,
  ItemDetails, CastMember, Season, Episode,
  MediaData, MediaSource, Subtitle,
  TrendingItem, HotContentItem, Recommendation,
  SearchResult, FootballMatch,
} from '@/types/api';

export const sampleHero: HeroBanner[] = [
  {
    id: 'hero-1',
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family. The saga continues in this epic sci-fi masterpiece.',
    image: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/8b8R8l88HjrKYRgJ9WjFnz2BkqO.jpg',
    type: 'movie',
    rating: 8.6,
    year: 2024,
  },
  {
    id: 'hero-2',
    title: 'The Bear',
    description: 'A young chef from the fine dining world returns to Chicago to run his family\'s sandwich shop after a tragic death.',
    image: 'https://image.tmdb.org/t/p/w500/cpZ3v3M5Fq3E2fA7P6bL5xJ9kRf.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/sGVCj7jUZ0YJLq3F7WxVw4xw9kL.jpg',
    type: 'series',
    rating: 8.5,
    year: 2024,
  },
  {
    id: 'hero-3',
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fm6Kq2J2H4mHZnxLxgvNxBnXpN.jpg',
    type: 'movie',
    rating: 8.3,
    year: 2023,
  },
];

export const sampleMovies: HomepageItem[] = [
  { id: 'm1', title: 'Dune: Part Two', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', backdrop: 'https://image.tmdb.org/t/p/original/8b8R8l88HjrKYRgJ9WjFnz2BkqO.jpg', overview: 'Paul Atreides unites with the Fremen.', rating: 8.6, year: 2024, genres: [{ id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }] },
  { id: 'm2', title: 'Oppenheimer', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', backdrop: 'https://image.tmdb.org/t/p/original/fm6Kq2J2H4mHZnxLxgvNxBnXpN.jpg', rating: 8.3, year: 2023 },
  { id: 'm3', title: 'The Batman', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', backdrop: 'https://image.tmdb.org/t/p/original/5P8SmMzSNYTiX7H3F2v1G7w3YkN.jpg', rating: 7.8, year: 2022 },
  { id: 'm4', title: 'Interstellar', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg', rating: 8.7, year: 2014 },
  { id: 'm5', title: 'John Wick 4', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', backdrop: 'https://image.tmdb.org/t/p/original/6QzN6S7R6m6e5dS6a6x6b6c6d6e.jpg', rating: 7.9, year: 2023 },
  { id: 'm6', title: 'Everything Everywhere All at Once', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', backdrop: 'https://image.tmdb.org/t/p/original/6P3cEg52hJzvMxV3J8Kv9x2y5R.jpg', rating: 8.1, year: 2022 },
  { id: 'm7', title: 'Spider-Man: Across the Spider-Verse', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', backdrop: 'https://image.tmdb.org/t/p/original/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 8.4, year: 2023 },
  { id: 'm8', title: 'The Dark Knight', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911M0KaYum5d6hL.jpg', backdrop: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5ez.jpg', rating: 8.5, year: 2008 },
  { id: 'm9', title: 'Inception', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', backdrop: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', rating: 8.8, year: 2010 },
  { id: 'm10', title: 'Blade Runner 2049', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rEYk2mhQJtU0w6x7yK.jpg', backdrop: 'https://image.tmdb.org/t/p/original/6hDp2zG6i7cG9sG8fG7hJ9kL0mN.jpg', rating: 8.0, year: 2017 },
];

export const sampleSeries: HomepageItem[] = [
  { id: 's1', title: 'The Bear', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/cpZ3v3M5Fq3E2fA7P6bL5xJ9kRf.jpg', backdrop: 'https://image.tmdb.org/t/p/original/sGVCj7jUZ0YJLq3F7WxVw4xw9kL.jpg', rating: 8.5, year: 2024 },
  { id: 's2', title: 'Stranger Things', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0m4bRykjP9Jm5Xy6e7f.jpg', backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9kTjXk8sD6eR.jpg', rating: 8.7, year: 2022 },
  { id: 's3', title: 'The Last of Us', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAtz2kUe2T.jpg', backdrop: 'https://image.tmdb.org/t/p/original/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 8.8, year: 2023 },
  { id: 's4', title: 'Succession', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/7nZ5P7U7V7C7n7a7J7c7M7R7k7L.jpg', backdrop: 'https://image.tmdb.org/t/p/original/1lp76L7o7a7F7s7G7h7J7k7L7z7.jpg', rating: 8.9, year: 2023 },
  { id: 's5', title: 'Breaking Bad', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L6p6f6q6x6s6d6.jpg', backdrop: 'https://image.tmdb.org/t/p/original/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 9.0, year: 2013 },
  { id: 's6', title: 'Game of Thrones', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/u3bZ2G5s5F5j5J5l5P5x5S5d5f.jpg', backdrop: 'https://image.tmdb.org/t/p/original/5p8SmMzSNYTiX7H3F2v1G7w3YkN.jpg', rating: 8.4, year: 2019 },
  { id: 's7', title: 'The Mandalorian', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/eU1i6e6X6n6a6J6z6M6q6A6s6d.jpg', backdrop: 'https://image.tmdb.org/t/p/original/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 8.7, year: 2023 },
  { id: 's8', title: 'House of the Dragon', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/z2y5U5l5B5v5H5c5K5x5W5q5r.jpg', backdrop: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9kTjXk8sD6eR.jpg', rating: 8.5, year: 2024 },
];

export const sampleTrending: TrendingItem[] = [
  { id: 't1', title: 'Dune: Part Two', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', rating: 8.6, year: 2024, rank: 1 },
  { id: 't2', title: 'The Bear', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/cpZ3v3M5Fq3E2fA7P6bL5xJ9kRf.jpg', rating: 8.5, year: 2024, rank: 2 },
  { id: 't3', title: 'Oppenheimer', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', rating: 8.3, year: 2023, rank: 3 },
  { id: 't4', title: 'The Last of Us', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAtz2kUe2T.jpg', rating: 8.8, year: 2023, rank: 4 },
  { id: 't5', title: 'Interstellar', type: 'movie', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.7, year: 2014, rank: 5 },
  { id: 't6', title: 'Succession', type: 'series', poster: 'https://image.tmdb.org/t/p/w500/7nZ5P7U7V7C7n7a7J7c7M7R7k7L.jpg', rating: 8.9, year: 2023, rank: 6 },
];

export const sampleHotContent: HotContentItem[] = [
  ...sampleMovies.slice(0, 6).map(m => ({ ...m, genres: m.genres || [] })),
  ...sampleSeries.slice(0, 4).map(s => ({ ...s, genres: [] })),
];

export const sampleHomepage: HomepageData = {
  hero: sampleHero,
  sections: [
    { id: 'sec-1', title: 'Popular Movies', type: 'popular', items: sampleMovies.slice(0, 10), layout: 'shelf' },
    { id: 'sec-2', title: 'Popular Series', type: 'popular', items: sampleSeries.slice(0, 8), layout: 'shelf' },
    { id: 'sec-3', title: 'Trending Now', type: 'trending', items: sampleTrending, layout: 'shelf' },
  ],
};

export function getSampleDetails(id: string): ItemDetails | null {
  const all = [...sampleMovies, ...sampleSeries];
  const item = all.find(i => i.id === id);
  if (!item) return null;

  const cast: CastMember[] = [
    { id: 'c1', name: 'Timothée Chalamet', character: 'Paul Atreides', image: 'https://image.tmdb.org/t/p/w185/1v7s9XzU8z8x8z8z8z8z8z8z8z8.jpg' },
    { id: 'c2', name: 'Zendaya', character: 'Chani', image: 'https://image.tmdb.org/t/p/w185/2v8s9XzU8z8x8z8z8z8z8z8z8z8.jpg' },
    { id: 'c3', name: 'Rebecca Ferguson', character: 'Lady Jessica', image: 'https://image.tmdb.org/t/p/w185/3v8s9XzU8z8x8z8z8z8z8z8z8z8.jpg' },
    { id: 'c4', name: 'Oscar Isaac', character: 'Duke Leto', image: 'https://image.tmdb.org/t/p/w185/4v8s9XzU8z8x8z8z8z8z8z8z8z8.jpg' },
    { id: 'c5', name: 'Josh Brolin', character: 'Gurney Halleck', image: 'https://image.tmdb.org/t/p/w185/5v8s9XzU8z8x8z8z8z8z8z8z8z8.jpg' },
  ];

  const seasons: Season[] = [
    {
      id: 'se1', number: 1, name: 'Season 1', overview: 'The beginning of an epic journey.',
      episodes: [
        { id: 'ep1', number: 1, title: 'Episode 1', overview: 'The story begins.', runtime: 55, image: 'https://image.tmdb.org/t/p/w300/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 8.5 },
        { id: 'ep2', number: 2, title: 'Episode 2', overview: 'The journey continues.', runtime: 52, image: 'https://image.tmdb.org/t/p/w300/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 8.3 },
        { id: 'ep3', number: 3, title: 'Episode 3', overview: 'New challenges arise.', runtime: 58, image: 'https://image.tmdb.org/t/p/w300/9n2tJBPl2J6Z7zJ6R6j5o6s6d6.jpg', rating: 8.7 },
      ],
      poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    },
  ];

  return {
    id: item.id,
    title: item.title,
    type: item.type,
    description: item.overview || 'An amazing story awaits you.',
    synopsis: item.overview || 'An incredible journey filled with excitement, drama, and unforgettable moments. Experience the thrill of premium entertainment.',
    poster: item.poster,
    backdrop: item.backdrop || 'https://image.tmdb.org/t/p/original/8b8R8l88HjrKYRgJ9WjFnz2BkqO.jpg',
    rating: item.rating || 8.0,
    year: item.year || 2024,
    runtime: 148,
    genres: item.genres || [{ id: 878, name: 'Sci-Fi' }, { id: 12, name: 'Adventure' }],
    cast,
    crew: [
      { id: 'cr1', name: 'Denis Villeneuve', job: 'Director', department: 'Directing' },
      { id: 'cr2', name: 'Jon Spaihts', job: 'Screenplay', department: 'Writing' },
    ],
    director: 'Denis Villeneuve',
    seasons: item.type === 'series' ? seasons : undefined,
    maturityRating: 'PG-13',
    language: 'English',
    country: 'US',
    releaseDate: '2024-03-01',
    tagline: 'Long live the fighters.',
    voteCount: 5200,
  };
}

export const sampleMedia: MediaData = {
  sources: [
    { url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '1080p', type: 'hls', label: 'Full HD' },
    { url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '720p', type: 'hls', label: 'HD' },
    { url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '480p', type: 'hls', label: 'SD' },
  ],
  subtitles: [
    { id: 'sub1', url: 'https://example.com/subtitles/en.vtt', language: 'en', label: 'English', type: 'vtt' },
    { id: 'sub2', url: 'https://example.com/subtitles/es.vtt', language: 'es', label: 'Spanish', type: 'vtt' },
    { id: 'sub3', url: 'https://example.com/subtitles/fr.vtt', language: 'fr', label: 'French', type: 'vtt' },
  ],
};

export const sampleFootball: FootballMatch[] = [
  {
    id: 'fb1', homeTeam: 'FC Barcelona', awayTeam: 'Real Madrid',
    homeScore: 2, awayScore: 1, status: 'live', minute: 67,
    date: '2026-07-29', time: '21:00', league: 'La Liga',
    venue: 'Camp Nou',
    streams: [{ id: 'st1', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '1080p', language: 'en', type: 'hls' }],
  },
  {
    id: 'fb2', homeTeam: 'Manchester City', awayTeam: 'Arsenal',
    homeScore: 0, awayScore: 0, status: 'live', minute: 23,
    date: '2026-07-29', time: '20:00', league: 'Premier League',
    venue: 'Etihad Stadium',
    streams: [{ id: 'st2', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', quality: '720p', language: 'en', type: 'hls' }],
  },
  {
    id: 'fb3', homeTeam: 'AC Milan', awayTeam: 'Inter Milan',
    status: 'upcoming', date: '2026-07-30', time: '20:45',
    league: 'Serie A', venue: 'San Siro',
    streams: [],
  },
];

export const sampleRecommendations: Recommendation[] = sampleMovies.slice(0, 8).map(m => ({
  ...m, reason: 'Because you watched similar content',
}));

export const sampleSearchResults: SearchResult[] = sampleMovies.map(m => ({
  id: m.id, title: m.title, type: m.type,
  poster: m.poster, backdrop: m.backdrop,
  overview: m.overview, rating: m.rating, year: m.year,
}));
