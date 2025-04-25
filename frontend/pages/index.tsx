import { useEffect, useState } from 'react';
import axios from 'axios';

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
    axios.get('http://localhost:3000/songs', { params: { search, type } })
      .then(res => setSongs(res.data));
  }, [search, type]);

  const toggleFavorite = (id: number) => {
    axios.patch(`http://localhost:3000/songs/${id}/favorite`).then(() => {
      setSongs(prev =>
        prev.map(s => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
      );
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Music App</h1>
      <input
        type="text"
        placeholder="Search songs..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select className="border p-2 mb-4 w-full" onChange={e => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="pop">Pop</option>
        <option value="rock">Rock</option>
        <option value="jazz">Jazz</option>
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
              {song.isFavorite ? 'Unmark Favorite' : 'Mark Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}