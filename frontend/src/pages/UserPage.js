import BookList from '../components/BookList';
import BorrowBook from '../components/BorrowBook';

function UserPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">👤 User Dashboard</h2>
        <p className="text-muted">
          Lihat daftar buku dan lakukan peminjaman
        </p>
      </div>

      {/* DAFTAR BUKU */}
      <div className="mb-4">
        <BookList role="user" />
      </div>

      {/* PINJAM BUKU */}
      <BorrowBook />
    </div>
  );
}

export default UserPage;