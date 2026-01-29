import { useState } from 'react';
import { borrowBook } from '../api/api';

function BorrowBook() {
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!bookId) {
      setError('ID Buku wajib diisi');
      return;
    }

    try {
      setLoading(true);

      const res = await borrowBook({
        bookId: Number(bookId),
        latitude: -7.8092146,
        longitude: 110.3222707
      });

      setMessage(res.message || 'Buku berhasil dipinjam');
      setBookId('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📍 Pinjam Buku
      </h3>

      {/* ERROR */}
      {error && (
        <div className="mb-3 rounded bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {message && (
        <div className="mb-3 rounded bg-green-100 text-green-700 px-4 py-2 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Buku
          </label>
          <input
            type="number"
            placeholder="Masukkan ID Buku"
            value={bookId}
            onChange={e => setBookId(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition
            ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {loading ? 'Memproses...' : '📚 Pinjam Buku'}
        </button>
      </form>
    </div>
  );
}

export default BorrowBook;