import { useEffect, useState } from 'react';
import axios from 'axios';

// after deploying backend on render, we created an env variable using backend url
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

type Song = {
  id: number;
  title: string;
  artist: string;
  type: string;
  isFavorite: boolean;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    // Fetch songs from the backend
    axios.get(`${API_BASE_URL}/songs`, { params: { search, type } })
      .then(res => setSongs(res.data));
  }, [search, type]);


   // Function to toggle favorite
   const toggleFavorite = (id: number) => {
    axios.patch(`${API_BASE_URL}/songs/${id}/favorite`).then(() => {
      setSongs(prev =>
        prev.map(s => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
      );
    });
  };

  // before deployment \\ initial code
  // useEffect(() => {
  //   // Fetch songs from the backend
  //   axios.get('http://localhost:4000/songs', { params: { search, type } })
  //     .then(res => setSongs(res.data));
  // }, [search, type]);


  // before deployment  \\ initial code
  // const toggleFavorite = (id: number) => {
  //   axios.patch(`http://localhost:4000/songs/${id}/favorite`).then(() => {
  //     setSongs(prev =>
  //       prev.map(s => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
  //     );
  //   });
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-4">🎧Music App 🎵</h1>
      <input
        type="text"
        placeholder="Search songs..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select className="border p-2 mb-4 w-full" onChange={e => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Classic">Classic</option>
      </select>
      <ul className="space-y-2">
        {songs.map(song => (
          <li key={song.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{song.title} - {song.artist}</h2>
            <p className="text-sm text-gray-500">Type: {song.type}</p>
            <button
              className="mt-2 text-blue-500 hover:underline"
              onClick={() => toggleFavorite(song.id)}
            >
              {song.isFavorite ? '❤️' : '🤍'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}