import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <BrowserRouter>
      <div className="container my-4">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 className="fw-bold">📖 Library Management</h1>
          <p className="text-muted">
            Aplikasi Manajemen Buku 
          </p>
        </div>

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-center text-muted mt-4">
          <small>
            © 2026 Library 
          </small>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
