import { useState } from 'react';
import { addBook } from '../api/api';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // VALIDASI WAJIB
    if (!title.trim() || !author.trim()) {
      setError('Judul dan Author tidak boleh kosong');
      return;
    }

    if (stock === '' || Number(stock) < 0) {
      setError('Stok harus diisi dan tidak boleh negatif');
      return;
    }

    try {
      const res = await addBook({
        title,
        author,
        stock: Number(stock)
      });

      setMessage(res.message || 'Buku berhasil ditambahkan');
      setTitle('');
      setAuthor('');
      setStock('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-4">➕ Tambah Buku</h4>

        {/* ALERT ERROR */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* ALERT SUCCESS */}
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Judul Buku</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan judul buku"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nama penulis"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stok</label>
            <input
              type="number"
              className="form-control"
              placeholder="Jumlah stok"
              value={stock}
              onChange={e => setStock(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            💾 Simpan Buku
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;