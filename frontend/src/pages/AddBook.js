import { useState } from 'react';
import { addBook } from '../api/api';
import ModalAlert from '../components/ModalAlert';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showModal = (type, title, message) => {
    setModal({
      show: true,
      type,
      title,
      message
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, show: false }));
  };

  const submit = async (e) => {
    e.preventDefault();

    // VALIDASI CLIENT
    if (!title.trim() || !author.trim()) {
      return showModal(
        'error',
        'Validasi Gagal',
        'Judul dan Author tidak boleh kosong'
      );
    }

    if (stock === '' || Number(stock) < 0) {
      return showModal(
        'error',
        'Validasi Gagal',
        'Stok harus diisi dan tidak boleh negatif'
      );
    }

    try {
      setLoading(true);

      await addBook({
        title,
        author,
        stock: Number(stock)
      });

      showModal(
        'success',
        'Berhasil',
        'Buku berhasil ditambahkan'
      );

      setTitle('');
      setAuthor('');
      setStock('');
    } catch (err) {
      showModal(
        'error',
        'Gagal',
        err.message || 'Terjadi kesalahan saat menyimpan buku'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="mb-4 fw-bold text-primary">
            <span className="text-secondary me-2">➕</span>
            Tambah Buku
          </h4>

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Judul Buku</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Author</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Stok</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={stock}
                onChange={e => setStock(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : '💾 Simpan Buku'}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL ALERT */}
      <ModalAlert
        show={modal.show}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </>
  );
}

export default AddBook;
