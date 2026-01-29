import AddBook from '../components/AddBook';
import BookList from '../components/BookList';

function AdminPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">🛠️ Admin Dashboard</h2>
        <p className="text-muted">
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