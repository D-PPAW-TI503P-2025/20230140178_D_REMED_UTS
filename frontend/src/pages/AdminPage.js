import AddBook from './AddBook';
import BookList from './BookList';

function AdminPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">
          <span className="text-secondary me-2">🛠️</span>
          Admin Dashboard
        </h2>
        <p className="text-muted mb-0">
          Kelola data buku perpustakaan
        </p>
      </div>

      {/* TAMBAH BUKU */}
      <div className="mb-4">
        <AddBook />
      </div>

      {/* DAFTAR BUKU */}
      <BookList role="admin" />
    </div>
  );
}

export default AdminPage;
