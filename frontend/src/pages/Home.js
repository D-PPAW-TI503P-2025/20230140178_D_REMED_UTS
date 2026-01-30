import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">

      {/* HERO / INTRO */}
      <div className="mb-5 p-5 bg-white rounded shadow-sm border">
        <h2 className="fw-bold text-primary mb-3">
          <span className="text-secondary me-2">📚</span>
          Selamat Datang di Library
        </h2>
        <p className="text-muted mb-0">
          Aplikasi manajemen perpustakaan sederhana berbasis web.
          <br />
          Silakan pilih peran untuk melanjutkan.
        </p>
      </div>

      {/* PILIH ROLE */}
      <div className="d-flex justify-content-center gap-4">
        <button
          className="btn btn-primary btn-lg px-5"
          onClick={() => navigate('/admin')}
        >
          <span className="text-light me-2">🛠️</span>
          Admin
        </button>

        <button
          className="btn btn-outline-primary btn-lg px-5"
          onClick={() => navigate('/user')}
        >
          <span className="text-secondary me-2">👤</span>
          User
        </button>
      </div>

    </div>
  );
}

export default Home;
