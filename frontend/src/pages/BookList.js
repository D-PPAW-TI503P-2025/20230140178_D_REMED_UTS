import { useEffect, useState, useCallback } from 'react';
import { getBooks, deleteBook, borrowBook } from '../api/api';
import ModalAlert from '../components/ModalAlert';

function BookList({ role = 'user' }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null
  });

  // ======================
  // MODAL HANDLER
  // ======================
  const showModal = (type, title, message, onConfirm = null) => {
    setModal({
      show: true,
      type,
      title,
      message,
      onConfirm
    });
  };

  const closeModal = () => {
    setModal(prev => ({
      ...prev,
      show: false,
      onConfirm: null
    }));
  };

  // ======================
  // LOAD BOOKS
  // ======================
  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      showModal(
        'error',
        'Gagal Memuat',
        err.message || 'Gagal mengambil data buku'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // ======================
  // USER: PINJAM BUKU
  // ======================
  const handleBorrow = async (book) => {
    if (book.stock < 1) {
      return showModal(
        'error',
        'Stok Habis',
        'Buku ini sedang tidak tersedia'
      );
    }

    try {
      setLoading(true);
      const res = await borrowBook(book.id);

      showModal(
        'success',
        'Berhasil',
        res.message || 'Buku berhasil dipinjam'
      );

      loadBooks();
    } catch (err) {
      showModal(
        'error',
        'Gagal',
        err.message || 'Gagal meminjam buku'
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // ADMIN: HAPUS BUKU
  // ======================
  const confirmDelete = (book) => {
    showModal(
      'warning',
      'Konfirmasi Hapus',
      `Yakin ingin menghapus buku "${book.title}"?`,
      async () => {
        try {
          setLoading(true);
          await deleteBook(book.id);
          closeModal();
          loadBooks();
        } catch (err) {
          showModal(
            'error',
            'Gagal',
            err.message || 'Gagal menghapus buku'
          );
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="fw-bold text-primary mb-3">
            <span className="text-secondary me-2">📚</span>
            Daftar Buku
          </h4>

          {loading && (
            <div className="alert alert-info">Memuat data...</div>
          )}

          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Judul</th>
                <th>Author</th>
                <th>Stok</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    Data buku belum tersedia
                  </td>
                </tr>
              )}

              {books.map((b, i) => (
                <tr key={b.id}>
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{b.title}</td>
                  <td>{b.author}</td>
                  <td>
                    <span
                      className={`badge ${
                        b.stock > 0 ? 'bg-success' : 'bg-danger'
                      }`}
                    >
                      {b.stock > 0
                        ? `Tersedia (${b.stock})`
                        : 'Habis'}
                    </span>
                  </td>

                  <td className="text-center">
                    {role === 'user' && (
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={b.stock < 1 || loading}
                        onClick={() => handleBorrow(b)}
                      >
                        📚 Pinjam
                      </button>
                    )}

                    {role === 'admin' && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        disabled={loading}
                        onClick={() => confirmDelete(b)}
                      >
                        🗑️ Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ALERT */}
      <ModalAlert
        show={modal.show}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        confirmText="Ya, Hapus"
        confirmVariant="danger"
      />
    </>
  );
}

export default BookList;
