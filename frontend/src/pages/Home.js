import BookList from '../components/BookList';

function Home() {
  return (
    <div>
      {/* HERO / INTRO */}
      <div className="mb-4 p-4 bg-light rounded border">
        <h2 className="fw-bold mb-2">📚 Selamat Datang di Library UCP</h2>
        <p className="text-muted mb-0">
          Aplikasi manajemen perpustakaan sederhana untuk melihat,
          menambah, dan meminjam buku.
        </p>
      </div>

      {/* DAFTAR BUKU */}
      <BookList role="guest" />
    </div>
  );
}

export default Home;