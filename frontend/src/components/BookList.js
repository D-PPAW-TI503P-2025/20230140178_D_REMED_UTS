import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/api';

function BookList({ role }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus buku ini?')) return;

    try {
      await deleteBook(id);
      loadBooks();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-3">📚 Daftar Buku</h4>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th>Judul</th>
                <th>Author</th>
                <th style={{ width: '15%' }}>Stok</th>
                {role === 'admin' && (
                  <th style={{ width: '15%' }}>Aksi</th>
                )}
              </tr>
            </thead>
            <tbody>
              {books.length === 0 && (
                <tr>
                  <td colSpan={role === 'admin' ? 5 : 4} className="text-center text-muted">
                    Data buku belum tersedia
                  </td>
                </tr>
              )}

              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td>
                    <span
                      className={`badge ${
                        book.stock > 0 ? 'bg-success' : 'bg-danger'
                      }`}
                    >
                      {book.stock > 0 ? `Tersedia (${book.stock})` : 'Habis'}
                    </span>
                  </td>

                  {role === 'admin' && (
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookList;