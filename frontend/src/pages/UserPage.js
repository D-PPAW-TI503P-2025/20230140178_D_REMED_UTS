import BookList from '../pages/BookList';

function UserPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">
          <span className="text-secondary me-2">👤</span>
          User Dashboard
        </h2>
        <p className="text-muted mb-0">
          Lihat daftar buku dan lakukan peminjaman
        </p>
      </div>

      {/* DAFTAR BUKU + PINJAM */}
      <BookList role="user" />
    </div>
  );
}

export default UserPage;
